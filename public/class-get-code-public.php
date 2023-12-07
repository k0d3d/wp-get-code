<?php

/**
 * The public-facing functionality of the plugin.
 *
 * @link       https://getcode.com
 * @since      1.0.0
 *
 * @package    Get_Code
 * @subpackage Get_Code/public
 */

/**
 * The public-facing functionality of the plugin.
 *
 * Defines the plugin name, version, and two examples hooks for how to
 * enqueue the public-facing stylesheet and JavaScript.
 *
 * @package    Get_Code
 * @subpackage Get_Code/public
 * @author     GetCode <michael.rhema@gmail.com>
 */
class Get_Code_Public
{

	/**
	 * The ID of this plugin.
	 *
	 * @since    1.0.0
	 * @access   private
	 * @var      string    $plugin_name    The ID of this plugin.
	 */
	private $plugin_name;

	/**
	 * The version of this plugin.
	 *
	 * @since    1.0.0
	 * @access   private
	 * @var      string    $version    The current version of this plugin.
	 */
	private $version;

	/**
	 * Initialize the class and set its properties.
	 *
	 * @since    1.0.0
	 * @param      string    $plugin_name       The name of the plugin.
	 * @param      string    $version    The version of this plugin.
	 */
	public function __construct($plugin_name, $version)
	{

		$this->plugin_name = $plugin_name;
		$this->version = $version;

		$this->init_shortcodes();
		$this->init_ajax_complete_user_post_purchase();
		$this->init_filter_the_content_for_shortcode();
	}

	/**
	 * Register the stylesheets for the public-facing side of the site.
	 *
	 * @since    1.0.0
	 */
	public function enqueue_styles()
	{

		/**
		 * This function is provided for demonstration purposes only.
		 *
		 * An instance of this class should be passed to the run() function
		 * defined in Get_Code_Loader as all of the hooks are defined
		 * in that particular class.
		 *
		 * The Get_Code_Loader will then create the relationship
		 * between the defined hooks and the functions defined in this
		 * class.
		 */

		wp_enqueue_style($this->plugin_name, plugin_dir_url(__FILE__) . 'css/get-code-public.css', array(), $this->version, 'all');
	}

	/**
	 * Register the JavaScript for the public-facing side of the site.
	 *
	 * @since    1.0.0
	 */
	public function enqueue_scripts()
	{

		/**
		 * This function is provided for demonstration purposes only.
		 *
		 * An instance of this class should be passed to the run() function
		 * defined in Get_Code_Loader as all of the hooks are defined
		 * in that particular class.
		 *
		 * The Get_Code_Loader will then create the relationship
		 * between the defined hooks and the functions defined in this
		 * class.
		 */

		wp_enqueue_script($this->plugin_name, plugin_dir_url(__FILE__) . 'js/get-code-public.js', array('jquery'), $this->version, true);
		wp_enqueue_script($this->plugin_name . '-js-app', plugin_dir_url(__FILE__) . 'js/assets/index.js', array($this->plugin_name), $this->version, true);


		// Localize script with additional data
		$current_post = get_post();
		if (empty($current_post)) return;
		wp_localize_script($this->plugin_name . '-js-app', 'GetCodeAppVars', array(
			'nonce' => wp_create_nonce(GET_CODE_NONCE),
			'user_id' => get_current_user_id(),
			'ajax_url' => admin_url('admin-ajax.php'),
			'post_id' => $current_post->ID,
			'destination' => get_option('get_code_opt_default_merchant_address'),
			'default_amount' => get_option('get_code_opt_default_amount')

		));
	}

	/**
	 * Displaying the custom text
	 */
	private function get_code_display_custom_text($merchant_address, $amount)
	{

		$html_attr = '';

		if (!empty($merchant_address)) {
			$html_attr .= "data-merchant-address='$merchant_address'";
		}

		if (!empty($amount)) {
			$html_attr .= "data-default-amount='$amount'";
		}

		if (get_option("get_code_opt_default_paywall_message")) {
			$custom_text = get_option("get_code_opt_default_paywall_message");
			$custom_text = '<div class="get_code_opt_default_paywall_message">' . $custom_text . '<div id="get-code-button-container" ' . $html_attr . ' ></div></div>';
		} else {
			$hidden_content_text = __('Purchase this item to view this hidden content', 'restricted-content-based-on-purchase');
			$custom_text = '<div class="get_code_opt_default_paywall_message">
				<div class="get_code_default_message_container">
					<p>
					Unlock the rest of this article
					for '.$amount.'
					</p>
					<div id="get-code-button-container" ' . $html_attr . ' ></div>
					<p>
						<span class="help-tip">Don’t have the Code Wallet app yet?
							<a href="https://www.getcode.com/#Download" target="_blank">Download It Now</a> and get your first $1 free
						</span>
					</p>
				</div>
			</div>';
		}
		return $custom_text;
	}

	private function get_code_show_content($atts = [], $content = null)
	{
		global $post;
		$atts = array_change_key_case((array) $atts, CASE_LOWER);

		$output = '';
		$output .= '<div class="get_code-box">';

		$current_user = wp_get_current_user();

		$merchant_address = !empty($atts['merchant_address']) ? $atts['merchant_address'] : null;
		$amount = !empty($atts['amount']) ? $atts['amount'] : null;

		if (current_user_can('administrator') || has_user_purchased($post->ID)) {

			if (!is_null($content)) {
				// protects output via content variable
				$output .= apply_filters('the_content', $content);
			}
		} else {
			// if user has not purchased product & is not admin
			$custom_text = $this->get_code_display_custom_text($merchant_address, $amount);
			$output .= $custom_text;
		}

		$output .= '</div>';

		return $output;
	}

	public function init_shortcodes()
	{
		$instance = $this;
		add_action('init', function () use ($instance) {
			add_shortcode('get_code_wall', function ($atts, $content) use ($instance) {
				return $instance->get_code_show_content($atts, $content);
			});
		});
	}

	// public 

	private function init_ajax_complete_user_post_purchase()
	{
		add_action('wp_ajax_get_code_save_purchase', [$this, 'save_purchase_ajax']);
	}

	// Callback function for the AJAX endpoint
	function save_purchase_ajax()
	{
		// Verify the nonce for security
		check_ajax_referer(GET_CODE_NONCE, 'nonce');

		// Validate and sanitize input data
		$data = array(
			'user_id'    => !empty($_POST['user_id']) ? absint($_POST['user_id']) : '',
			'post_url'   => !empty($_POST['post_url']) ? esc_url_raw($_POST['post_url']) : '',
			'post_id'    => !empty($_POST['post_id']) ? sanitize_text_field($_POST['post_id']) : '',
			'code_tx_id' => !empty($_POST['code_tx_id']) ? sanitize_text_field($_POST['code_tx_id']) : '',
			'tx_intent'  => !empty($_POST['tx_intent']) ? sanitize_text_field($_POST['tx_intent']) : '',
			'tx_status'  => !empty($_POST['tx_status']) ? sanitize_text_field($_POST['tx_status']) : '',
		);


		// Additional data validation if needed

		// Perform the purchase record save
		$record_id = save_purchase_record($data);

		if ($record_id) {
			// Return a success response with the inserted record ID
			wp_send_json_success(array('record_id' => $record_id));
		} else {
			// Return an error response
			wp_send_json_error(array('message' => 'Failed to insert record.'));
		}

		// Always exit to avoid extra output
		wp_die();
	}

	public function init_filter_the_content_for_shortcode()
	{

		function get_code_content_display($content)
		{

			// Check if the current post content contains the shortcode [get_code_wall]
			if (has_shortcode($content, 'get_code_wall')) {

				// Get the content before the shortcode
				$content_before_shortcode = get_code_shortcode_content($content, 'get_code_wall');
				$content_before_shortcode .= do_shortcode('[get_code_wall]');
				// Display only the content before the shortcode
				return apply_filters('the_content', $content_before_shortcode);
				// return 
			} else {
				// Display the entire content
				return $content;
			}
		}

		// Helper function to get content before the opening tag of a shortcode
		function get_code_shortcode_content($content, $shortcode) {
		    $pattern = get_shortcode_regex(array($shortcode));
		    preg_match("/$pattern/", $content, $matches);

		    if (isset($matches[0])) {
		        // Find the position of the opening tag in the content
		        $tag_start = strpos($content, $matches[0]);

		        if ($tag_start !== false) {
		            // Return the content before the opening tag
		            return substr($content, 0, $tag_start);
		        }
		    }

		    // Return the original content if the shortcode is not found
		    return $content;
		}

		// Hook the custom content display function into the_content filter
		add_filter('the_content', 'get_code_content_display');
	}
}
