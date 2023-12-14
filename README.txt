=== Plugin Name ===
Contributors: k0d3d
Donate link: https://getcode.com/
Tags: micro-payment
Requires at least: 6.0
Tested up to: 6.1
Stable tag: 1.0.51
Requires PHP: 7.0
License: GPLv2 or later
License URI: http://www.gnu.org/licenses/gpl-2.0.html

The Code Wordpress Plugin is a library that empowers Wordpress developers to easily integrate Code payments into their website.

== Description ==

Code is a mobile wallet app that leverages self custodial blockchain technology to deliver a seamless payments experience that is instant, global, and private.
With minimal setup and support for Gutenberg and Elementor and classic editor (using a short code), you can start accepting payments effortlessly.

Features:
- WooCommerce checkout integration. Allow users pay for products using Code Wallet.
- Content Paywall integration with support for classic, Gutenberg and Elementor editors.Allow users pay for selected posts and pages using Code Wallet. 

== Installation ==

1. Extract the .zip file download of this repo.
2. Upload the extracted folder to the `/wp-content/plugins/` directory
or Use WordPress’ Add New Plugin feature, and upload the .zip file download.,
3. Activate the plugin through the 'Plugins' menu in WordPress
4. From the Wp Dashboard menu, select Get Code. 
5. Enter your "Code Deposit Address" and "Amount you want to charge"
- For WooCommerce 
6. From WooCommerce->Settings->Payments select Code Checkout option.
7. Enable Code Checkout.
8. Fill the form properly and save. 


== Screenshots ==

1. Options for Paywall and Destinaton address
2. Woocommerce checkout options

== Changelog ==

= 1.0.51 =
* First release.


`<?php code(); // goes in backticks ?>`