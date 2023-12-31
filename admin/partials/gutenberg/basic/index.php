<?php

/**
 * Plugin Name: GetCode Basic
 * Plugin URI: https://getcode.com
 * Description: Register GetCode blocks for the Gutenberg editor.
 * Version: 1.1.0
 * Author: the GetCode Team
 *
 * @package get-code
 */

defined( 'ABSPATH' ) || exit;

/**
 * Load all translations for our plugin from the MO file.
 */
add_action( 'init', 'get_code_01_load_textdomain' );

function get_code_01_load_textdomain() {
	load_plugin_textdomain( 'get-code', false, basename( __DIR__ ) . '/languages' );
}

/**
 * Registers all block assets so that they can be enqueued through Gutenberg in
 * the corresponding context.
 *
 * Passes translations to JavaScript.
 */
function get_code_01_register_block() {

	if ( ! function_exists( 'register_block_type' ) ) {
		// Gutenberg is not active.
		return;
	}
	
	// __DIR__ is the current directory where block.json file is stored.
	register_block_type( __DIR__ );
	
	if ( function_exists( 'wp_set_script_translations' ) ) {
		/**
		 * May be extended to wp_set_script_translations( 'my-handle', 'my-domain',
		 * plugin_dir_path( MY_PLUGIN ) . 'languages' ) ). For details see
		 * https://make.wordpress.org/core/2018/11/09/new-javascript-i18n-support-in-wordpress/
		 */
		wp_set_script_translations( 'get-code-01', 'get-code' );
	}

}
add_action( 'init', 'get_code_01_register_block' );
