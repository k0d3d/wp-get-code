<?php

/**
 * Provide a public-facing view for the plugin
 *
 * This file is used to markup the public-facing aspects of the plugin.
 *
 * @link       https://getcode.com
 * @since      1.0.0
 *
 * @package    Get_Code
 * @subpackage Get_Code/public/partials
 */
?>

<!-- This file should primarily consist of HTML with a little bit of PHP. -->
<div>
  <p>Complete the checkout form then click</p>

  <div id="button-container"></div>
</div>
<script type="module">
  // import code from 'https://js.getcode.com/v1';
  window.main &&  window.main(window['GetCodeAppVars'].default_amount || 0, true)
</script>