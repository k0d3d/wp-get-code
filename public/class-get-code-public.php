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

		wp_enqueue_script($this->plugin_name, plugin_dir_url(__FILE__) . 'js/get-code-public.js', array('jquery'), $this->version, false);
	}

	/**
	 * Displaying the custom text
	 */
	private function get_code_display_custom_text()
	{
		if (get_option("get_code_opt_default_paywall_message")) {
			$custom_text = get_option("get_code_opt_default_paywall_message");
			$custom_text = '<div class="get_code_opt_default_paywall_message">' . $custom_text . '</div>';
		} else {
			$hidden_content_text = __('Purchase this item to view this hidden content', 'restricted-content-based-on-purchase');
			$custom_text = '<div class="get_code_opt_default_paywall_message"><p>' . $hidden_content_text . '</p></div>';
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

		if (current_user_can('administrator') || wc_customer_bought_product($current_user->email, $current_user->ID, $atts['id'])) {

			// // if the selected product id for the snippet option is different from the product id in the shortcode
			if (!current_user_can('administrator') && $post->get_code_product_select && $post->get_code_meta_info && 'hide_excerpt_meta' === $post->get_code_meta_info && $atts['id'] !== $post->get_code_product_select) {
				$custom_text = $this->get_code_display_custom_text();
				$output .= $custom_text;
			} else {
				if (!is_null($content)) {
					// protects output via content variable
					$output .= apply_filters('the_content', $content);
				}
			}
		} else {
			// if user has not purchased product & is not admin
			$custom_text = $this->get_code_display_custom_text();
			$output .= $custom_text;
		}

		$output .= '</div>';

		return $output;
	}

	public function init_shortcodes()
	{
		add_action('init', function () {
			add_shortcode('get_code_wall', [$this,  'get_code_show_content']);
		});
	}
}
