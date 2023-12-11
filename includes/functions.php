<?php

require 'vendor/autoload.php';

use CodeWallet\Client\PaymentIntents;


define('GET_CODE_PLUGIN_NAME', 'get-code-wp');
define('GET_CODE_NAMESPACE', 'get_code_app');
define('GET_CODE_NONCE', 'get_code_nonce');
define('GET_CODE_TABLE_NAME_USER_PURCHASES', 'get_code_user_purchases');




// @todo: move to new file
/**
 * Keeps a record of a user's purchase to the database.
 * This function does not save the destination address.
 */
function save_purchase_record($data)
{
  global $wpdb;

  // Replace 'wp_get_code_user_purchases' with your actual table name
  $table_name = $wpdb->prefix . GET_CODE_TABLE_NAME_USER_PURCHASES;

  // Prepare data for insertion
  $insert_data = array(
    'user_id'     => $data['user_id'],
    'post_url'    => $data['post_url'],
    'post_id'     => $data['post_id'],
    'amount'  => $data['amount'],
    'currency'  => $data['currency'],
    'tx_intent'   => $data['tx_intent'],
    'tx_status'   => $data['status'],
    'created_at'  => current_time('mysql', 1), // Use WordPress current time in MySQL format
  );

  // Format the data types for the insert statement
  $data_formats = array('%d', '%s', '%d', '%d', '%s', '%s', '%s', '%s');

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


function has_user_purchased($post_id)
{
  global $wpdb;

  // Replace 'your_table_name' with the actual table name
  $table_name = $wpdb->prefix . GET_CODE_TABLE_NAME_USER_PURCHASES;

  // Get the current user ID
  $user_id = get_current_user_id();

  // Prepare and execute the SQL query
  $query = $wpdb->prepare(
    "SELECT COUNT(id) FROM $table_name WHERE user_id = %d AND post_id = %d",
    array(
      $user_id,
      $post_id
    )
  );

  $purchase_count = $wpdb->get_var($query);

  // Check if the user has made any purchases
  return $purchase_count > 0;
}

// Callback function for the custom route
function verify_purchase_callback($data)
{
  global $wpdb;

  // Retrieve and sanitize query parameters
  $nonce     = sanitize_text_field($data['nonce']);
  $tx_intent = sanitize_text_field($data['tx_intent']);
  
  $table_name = $wpdb->prefix . GET_CODE_TABLE_NAME_USER_PURCHASES;

  // verification logic here...
  $status = PaymentIntents::getStatus($tx_intent);

  // Check if a record with the given $tx_intent exists
  $result = $wpdb->get_row($wpdb->prepare("SELECT * FROM $table_name WHERE tx_intent = %s", $tx_intent));

  if (!$result) {
    // No record found, return an error
    echo "Error: No record found for the given tx_intent.";
  } else {
    // Record found, update the status column to "success"
    $wpdb->update(
      $table_name,
      array('tx_status' => $status),
      array('tx_intent' => $tx_intent)
    );

    echo "Success: Record updated.";
    wp_send_json_success([
      'tx_status' => $status,
      'tx_intent' => $tx_intent
    ]);
  }

  // Example response
  $response = array(
    'success' => true,
    'message' => 'Verification successful!',
    'nonce'   => $nonce,
    'tx_intent' => $tx_intent,
  );

  return rest_ensure_response($response);
}
