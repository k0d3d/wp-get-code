<?php

/**
 * Fired during plugin deactivation
 *
 * @link       https://getcode.com
 * @since      1.0.0
 *
 * @package    Get_Code
 * @subpackage Get_Code/includes
 */

/**
 * Fired during plugin deactivation.
 *
 * This class defines all code necessary to run during the plugin's deactivation.
 *
 * @since      1.0.0
 * @package    Get_Code
 * @subpackage Get_Code/includes
 * @author     GetCode <michael.rhema@gmail.com>
 */
class Get_Code_Deactivator {

	/**
	 * Short Description. (use period)
	 *
	 * Long Description.
	 *
	 * @since    1.0.0
	 */
	public static function deactivate() {
		$clear_tables = get_option( 'get_code_opts_clear_tables' );
		if ( $clear_tables ) {
			self::clear_tables();
		}
	}

	private function clear_tables() {
		global $wpdb;
		
		$table_name = $wpdb->prefix . GET_CODE_TABLE_NAME_USER_PURCHASES;
		$wpdb->query( $wpdb->prepare( "DROP TABLE IF EXISTS %s", $table_name ) );

		
		
	}

}
