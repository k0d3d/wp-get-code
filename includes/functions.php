<?php

define('GET_CODE_PLUGIN_NAME', 'get-code-wp');
define('GET_CODE_NONCE', 'get_code_nonce');
define('GET_CODE_TABLE_NAME_USER_PURCHASES', 'get_code_user_purchases');




// @todo: move to new file
/**
 * Keeps a record of a user's purchase to the database.
 */
function save_purchase_record($data) {
  global $wpdb;

  // Replace 'wp_get_code_user_purchases' with your actual table name
  $table_name = $wpdb->prefix . 'wp_get_code_user_purchases';

  // Prepare data for insertion
  $insert_data = array(
      'user_id'     => $data['user_id'],
      'post_url'    => $data['post_url'],
      'post_id'     => $data['post_id'],
      'code_tx_id'  => $data['code_tx_id'],
      'tx_intent'   => $data['tx_intent'],
      'tx_status'   => $data['tx_status'],
      'created_at'  => current_time('mysql', 1), // Use WordPress current time in MySQL format
  );

  // Format the data types for the insert statement
  $data_formats = array('%d', '%s', '%s', '%s', '%s', '%s', '%s');

  // Insert data into the database
  $wpdb->insert($table_name, $insert_data, $data_formats);

  // Check for errors
  if ($wpdb->last_error) {
      // Handle the error, e.g., log it or return false
      return false;
  }

  // Return the ID of the inserted record
  return $wpdb->insert_id;
}
