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
            <h4>Checkout</h4>
            <form id="custom-options-form">
              <table class="form-table">
                <div class="form-group">
                  <label class="form-label">Merchant Address</label>
                  <input class="form-control" type="text" name="get_code_opt_default_merchant_address" value="<?php echo esc_attr(get_option('get_code_opt_default_merchant_address')); ?>" />
                </div>
              </table>
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

        var nonce = $('#custom_options_nonce').val();

        $.ajax({
          type: 'POST',
          url: ajaxurl,
          data: {
            action: 'save_custom_options',
            merchant_address: merchantAddress,
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