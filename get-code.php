<?php

/**
 * The plugin bootstrap file
 *
 * This file is read by WordPress to generate the plugin information in the plugin
 * admin area. This file also includes all of the dependencies used by the plugin,
 * registers the activation and deactivation functions, and defines a function
 * that starts the plugin.
 *
 * @link              https://getcode.com
 * @since             1.0.0
 * @package           Get_Code
 *
 * @wordpress-plugin
 * Plugin Name:       Code Wallet
 * Plugin URI:        https://github.com/k0d3d/wp-get-code
 * Description:       Use Code Wallet with Wordpress
 * Version:           1.0.67
 * Author:            k0d3d
 * Author URI:        https://getcode.com/
 * License:           GPL-2.0+
 * License URI:       http://www.gnu.org/licenses/gpl-2.0.txt
 * Text Domain:       get-code
 * Domain Path:       /languages
 */

// If this file is called directly, abort.
if ( ! defined( 'WPINC' ) ) {
	die;
}

/**
 * Currently plugin version.
 * Start at version 1.0.0 and use SemVer - https://semver.org
 * Rename this for your plugin and update it as you release new versions.
 */
define( 'GET_CODE_VERSION', '1.0.67' );

define('GET_CODE_APP_PATH', plugin_dir_path(__FILE__));
define('GET_CODE_APP_URL', plugin_dir_url(__FILE__));

/**
 * The code that runs during plugin activation.
 * This action is documented in includes/class-get-code-activator.php
 */
function activate_get_code() {
	require_once plugin_dir_path( __FILE__ ) . 'includes/class-get-code-activator.php';
	Get_Code_Activator::activate();
}

/**
 * The code that runs during plugin deactivation.
 * This action is documented in includes/class-get-code-deactivator.php
 */
function deactivate_get_code() {
	require_once plugin_dir_path( __FILE__ ) . 'includes/class-get-code-deactivator.php';
	Get_Code_Deactivator::deactivate();
}

register_activation_hook( __FILE__, 'activate_get_code' );
register_deactivation_hook( __FILE__, 'deactivate_get_code' );

/**
 * The core plugin class that is used to define internationalization,
 * admin-specific hooks, and public-facing site hooks.
 */
require plugin_dir_path( __FILE__ ) . 'includes/class-get-code.php';

/**
 * Begins execution of the plugin.
 *
 * Since everything within the plugin is registered via hooks,
 * then kicking off the plugin from this point in the file does
 * not affect the page life cycle.
 *
 * @since    1.0.0
 */
function run_get_code() {

	$plugin = new Get_Code();
	$plugin->run();

}
run_get_code();
