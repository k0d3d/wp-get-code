<?php
/**
 * Description: demonstrating how to use Format API in the Gutenberg editor.
 *
 * @package get-code
 */

defined( 'ABSPATH' ) || exit;

/**
 * Registers all block assets so that they can be enqueued through Gutenberg in
 * the corresponding context.
 */
add_action( 'init', function() {
	// Automatically load dependencies and version.
	$asset_file = include plugin_dir_path( __FILE__ ) . 'build/index.asset.php';

	wp_register_script(
		'get-code-format-api',
		plugins_url( 'build/index.js', __FILE__ ),
		$asset_file['dependencies'],
		$asset_file['version'],
		true
	);
} );

/**
 * Enqueue block editor assets for this example.
 */
add_action( 'enqueue_block_editor_assets', function() {
	wp_enqueue_script( 'get-code-format-api' );
} );
