<?php

/**
 * Fired during plugin activation
 *
 * @link       https://getcode.com
 * @since      1.0.0
 *
 * @package    Get_Code
 * @subpackage Get_Code/includes
 */

/**
 * Fired during plugin activation.
 *
 * This class defines all code necessary to run during the plugin's activation.
 *
 * @since      1.0.0
 * @package    Get_Code
 * @subpackage Get_Code/includes
 * @author     GetCode <michael.rhema@gmail.com>
 */
class Get_Code_Activator
{

	/**
	 * Short Description. (use period)
	 *
	 * Long Description.
	 *
	 * @since    1.0.0
	 */
	public static function activate()
	{
		create_user_purchase_table();
	}

}

function create_user_purchase_table()
{
	global $wpdb;

	$table_name = $wpdb->prefix . GET_CODE_TABLE_NAME_USER_PURCHASES;
	if ($wpdb->get_var($wpdb->prepare("SHOW TABLES LIKE %s", $table_name)) == $table_name) {
		return;
	}
	$charset_collate = $wpdb->get_charset_collate();
	// @todo: fix the lengths
	$sql = "CREATE TABLE $table_name (
		id mediumint(9) NOT NULL AUTO_INCREMENT,
		user_id mediumint(9) NOT NULL,
		post_url VARCHAR(255) DEFAULT NULL,
		post_id VARCHAR(255) DEFAULT NULL,
		code_tx_id VARCHAR(255) DEFAULT NULL,
		tx_intent VARCHAR(255) DEFAULT NULL,
		tx_status VARCHAR(20) DEFAULT NULL,
		created_at datetime NOT NULL,
		PRIMARY KEY  (id)
	) $charset_collate;";

	require_once(ABSPATH . 'wp-admin/includes/upgrade.php');
	dbDelta($sql);
}
