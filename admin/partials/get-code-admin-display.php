<?php

/**
 * Provide a admin area view for the plugin
 *
 * This file is used to markup the admin-facing aspects of the plugin.
 *
 * @link       https://getcode.com
 * @since      1.0.0
 *
 * @package    Get_Code
 * @subpackage Get_Code/admin/partials
 */
defined('ABSPATH') || exit;
?>

<!-- This file should primarily consist of HTML with a little bit of PHP. -->
<div class="container-fluid">
  <div class="row">
    <div class="col-md-12">
      <div class="row">
        <div class="col-md-4">
          <h2>
            Settings
          </h2>
          <hr>
          <section>
            <form id="custom-options-form">
              <div class="form-table">
                <h4>Checkout</h4>
                <div class="form-group">
                  <label class="form-label">Code Deposit Address</label>
                  <input class="form-control" type="text" name="get_code_opt_default_merchant_address" value="<?php echo esc_attr(get_option('get_code_opt_default_merchant_address')); ?>" />
                </div>
                <div class="form-group">
                  <label class="form-label">How much do you wanna charge?</label>
                  <select class="form-control" type="text" name="get_code_opt_default_amount" >
                    <?php $selected_value = get_option('get_code_opt_default_amount'); ?>
                    <option <?php echo $selected_value == "0.25" ? 'selected' : '' ?> value="0.25">0.25</option>
                    <option <?php echo $selected_value == "0.50" ? 'selected' : '' ?> value="0.50">0.50</option>
                    <option <?php echo $selected_value == "0.75" ? 'selected' : '' ?> value="0.75">0.75</option>
                    <option <?php echo $selected_value == "1" ? 'selected' : '' ?> value="1">1</option>
                  </select>
                </div>
              </div>
              <?php wp_nonce_field(GET_CODE_NONCE, 'custom_options_nonce'); ?>
              <input type="submit" class="button button-primary" value="Save Options">
            </form>
          </section>
        </div>
      </div>
    </div>
  </div>
</div>
<script>
  jQuery(document).ready(function($) {
    $('#custom-options-form').submit(function(e) {
      e.preventDefault();

      const merchantAddress = $('[name="get_code_opt_default_merchant_address"]')[0].value;
      const amount = $('[name="get_code_opt_default_amount"]')[0].value;

      var nonce = $('#custom_options_nonce').val();

      $.ajax({
        type: 'POST',
        url: ajaxurl,
        data: {
          action: 'get_code_save_custom_options',
          merchant_address: merchantAddress,
          default_amount: amount,
          nonce: nonce
        },
        dataType: 'json',
        success: function(response) {
          if (response.success) {
            alert('Options saved successfully!');
          } else {
            alert('Error saving options. Please try again.');
          }
        }
      });
    });
  });
</script>


<?
