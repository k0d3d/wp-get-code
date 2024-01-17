<?php

require GET_CODE_APP_PATH . '/vendor/autoload.php';

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


/**
 * Updates a record of a user's purchase to the database.
 * This function does not save the destination address.
 */
function update_purchase_record($data)
{
  global $wpdb;

  // Replace 'wp_get_code_user_purchases' with your actual table name
  $table_name = $wpdb->prefix . GET_CODE_TABLE_NAME_USER_PURCHASES;

  // Insert data into the database
  $wpdb->update(
    $table_name,
    array('tx_status' => $data['status']),
    array('tx_intent' => $data['tx_intent'])
  );

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
    "SELECT COUNT(id) FROM $table_name WHERE user_id = %d AND post_id = %d AND tx_status = 'confirmed'",
    array(
      $user_id,
      $post_id
    )
  );

  $purchase_count = $wpdb->get_var($query);

  // Check if the user has made any purchases
  return $purchase_count > 0;
}

/**
* Callback function for the custom route.
* This will return a user purchase record 
* which includes a post_id if the intent returns 
* a SUBMITTED status else it returns false.
* If It will return "not submitted" if no intent is 
* not == submitted. It 
*/ 

function verify_purchase_callback($data)
{
  global $wpdb;

  // Retrieve and sanitize query parameters
  $tx_intent = sanitize_text_field($data['tx_intent']);

  $table_name = $wpdb->prefix . GET_CODE_TABLE_NAME_USER_PURCHASES;

  // verification logic here...
  // @todo: verify the status 
  $status = PaymentIntents::getStatus($tx_intent); 
  // $status = [
  //   "status" => "SUBMITTED"
  // ];

  update_purchase_record([
    "status" => $status['status'],
    "tx_intent" => $tx_intent
  ]);	

  if ($status['status'] !== 'confirmed') {
    wp_send_json_error(['not submitted']);
  }

  // Check if a record with the given $tx_intent exists.
  $result = $wpdb->get_row($wpdb->prepare("SELECT * FROM $table_name WHERE tx_intent = %s AND tx_status='confirmed'", $tx_intent));

  if (!$result) {
    // No record found, return an error
    return false;
  } else {
    return $result;
  }
}


function replace_shortcode_in_string($content, $shortcode_to_replace, $replacement)
{
  $pattern = get_shortcode_regex(array($shortcode_to_replace));
  $content = preg_replace_callback("/$pattern/", function ($matches) use ($replacement) {
    return str_replace($matches[0], $replacement, $matches[0]);
  }, $content);

  return $content;
}

/**
 * Check if Block Editor is active.
 * Must only be used after plugins_loaded action is fired.
 *
 * @return bool
 */
function is_gutenberg_active() {
	// Gutenberg plugin is installed and activated.
	$gutenberg = ! ( false === has_filter( 'replace_editor', 'gutenberg_init' ) );

	// Block editor since 5.0.
	$block_editor = version_compare( $GLOBALS['wp_version'], '5.0-beta', '>' );

	if ( ! $gutenberg && ! $block_editor ) {
		return false;
	}

	if ( is_classic_editor_plugin_active() ) {
		$editor_option       = get_option( 'classic-editor-replace' );
		$block_editor_active = array( 'no-replace', 'block' );

		return in_array( $editor_option, $block_editor_active, true );
	}

	return true;
}

/**
 * Check if Classic Editor plugin is active.
 *
 * @return bool
 */
function is_classic_editor_plugin_active() {
  if ( ! function_exists( 'is_plugin_active' ) ) {
      include_once ABSPATH . 'wp-admin/includes/plugin.php';
  }

  if ( is_plugin_active( 'classic-editor/classic-editor.php' ) ) {
      return true;
  }

  return false;
}