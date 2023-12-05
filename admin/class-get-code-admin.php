<?php

/**
 * The admin-specific functionality of the plugin.
 *
 * @link       https://getcode.com
 * @since      1.0.0
 *
 * @package    Get_Code
 * @subpackage Get_Code/admin
 */

/**
 * The admin-specific functionality of the plugin.
 *
 * Defines the plugin name, version, and two examples hooks for how to
 * enqueue the admin-specific stylesheet and JavaScript.
 *
 * @package    Get_Code
 * @subpackage Get_Code/admin
 * @author     GetCode <michael.rhema@gmail.com>
 */
class Get_Code_Admin
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
	 * @param      string    $plugin_name       The name of this plugin.
	 * @param      string    $version    The version of this plugin.
	 */
	public function __construct($plugin_name, $version)
	{

		$this->plugin_name = $plugin_name;
		$this->version = $version;

		$this->init_elementor_widgets();
		$this->init_save_admin_options();
	}

	/**
	 * Register the stylesheets for the admin area.
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

		$screen = get_current_screen();
		
    // Check if the current screen is your plugin's settings page
    if (is_object($screen) && $screen->id === 'toplevel_page_get-code') {
			// Enqueue your styles here
				wp_enqueue_style($this->plugin_name, plugin_dir_url(__FILE__) . 'css/get-code-admin.css', array(), $this->version, 'all');
    }
	}

	/**
	 * Register the JavaScript for the admin area.
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

		wp_enqueue_script($this->plugin_name, plugin_dir_url(__FILE__) . 'js/get-code-admin.js', array('jquery'), $this->version, false);
	}

	/**
	 * Add Admin Page Menu page.
	 *
	 * @since    1.0.0
	 */
	public function add_admin_menu()
	{

		add_menu_page(
			esc_html__('Get Code', 'get-code'),
			esc_html__('Get Code', 'get-code'),
			'manage_options',
			$this->plugin_name,
			array($this, 'add_setting_root_div'),
			plugins_url( 'get-code-app/admin/img/favicon-16x16.png')
		);
	}

	/**
	 * Add HTML For Admin Options Screen.
	 *
	 * @since    1.0.0
	 */
	public function add_setting_root_div()
	{
		include_once(GET_CODE_APP_PATH . 'admin/partials/get-code-admin-display.php');
	}

	public function init_elementor_widgets () {

		function register_get_code_widget( $widgets_manager ) {

			require_once( __DIR__ . '/partials/get-code-admin-elementor-widget.php' );
		
			$widgets_manager->register( new GetCode\Widgets\Get_Code_Elementor_Widget() );		
		}

		add_action( 'elementor/widgets/register', 'register_get_code_widget' );

	}

	public function init_save_admin_options()
	{
			function save_custom_options()
			{
					check_ajax_referer(GET_CODE_NONCE, 'nonce');

					if (current_user_can('manage_options')) {
							$merchant_address = isset($_POST['merchant_address']) ? sanitize_text_field($_POST['merchant_address']) : '';
							$amount = isset($_POST['amount']) ? sanitize_text_field($_POST['amount']) : '';
							$payall_message = isset($_POST['payall_message']) ? sanitize_text_field($_POST['payall_message']) : '';

							update_option('get_code_opt_default_merchant_address', $merchant_address);
							update_option('get_code_opt_default_amount', $amount);
							update_option('get_code_opt_default_paywall_message', $payall_message);

							wp_send_json_success([
									"merchant_address" => $merchant_address,
									"amount" => $amount,
									"paywall_message" => $payall_message
							]);
					} else {
							wp_send_json_error();
					}
			}
			add_action('wp_ajax_save_custom_options', 'save_custom_options');
	}

}
