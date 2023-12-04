<?php
namespace GetCode\Widgets;

use Elementor\Widget_Base;
use Elementor\Controls_Manager;

class Get_Code_Elementor_Widget extends Widget_Base {

	public function get_name() {
		return 'get_code_widget_1';
	}

	public function get_title() {
		return esc_html__( 'Pay with Code', 'get-code' );
	}

	public function get_icon() {
		return 'eicon-code';
	}

	public function get_categories() {
		return [ 'basic' ];
	}

  protected function _register_controls() {
    $this->start_controls_section(
        'content_section',
        [
            'label' => __( 'Content', 'elementor' ),
            'tab' => \Elementor\Controls_Manager::TAB_CONTENT,
        ]
    );

    $this->add_control(
        'custom_content',
        [
            'label' => __( 'Custom Content', 'elementor' ),
            'type' => \Elementor\Controls_Manager::TEXTAREA,
            'input_type' => 'text',
            'placeholder' => __( 'Enter your content here', 'elementor' ),
        ]
    );

    $this->add_control(
        'merchant_address',
        [
            'label' => __( 'Merchant Address', 'elementor' ),
            'type' => \Elementor\Controls_Manager::TEXT,
            'input_type' => 'text',
            'placeholder' => __( 'Enter merchant address', 'elementor' ),
        ]
    );

    $this->end_controls_section();
}

protected function render() {
    $settings = $this->get_settings();
    $custom_content = $settings['custom_content'];
    $merchant_address = $settings['merchant_address'];

    // Wrap content in shortcode tags
    $shortcode_content = "[get_code_wall merchant_address=\"$merchant_address\"]$custom_content[/get_code_wall]";

    echo esc_html($shortcode_content);
    // echo do_shortcode($shortcode_content);
}

}