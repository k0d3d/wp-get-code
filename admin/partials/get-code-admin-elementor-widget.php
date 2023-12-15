<?php

namespace GetCode\Widgets;

use Elementor\Widget_Base;
use Elementor\Controls_Manager;

class Get_Code_Elementor_Widget extends Widget_Base
{

    public function get_name()
    {
        return 'get_code_widget_1';
    }

    public function get_title()
    {
        return esc_html__('Pay with Code', 'get-code');
    }

    public function get_icon()
    {
        return 'get-code-icon';
    }

    public function get_categories()
    {
        return ['basic'];
    }

    protected function _register_controls()
    {
        $this->start_controls_section(
            'content_section',
            [
                'label' => __('Content', 'elementor'),
                'tab' => \Elementor\Controls_Manager::TAB_CONTENT,
            ]
        );


        $this->end_controls_section();
    }

    protected function render()
    {
        $settings = $this->get_settings();

        // Wrap content in shortcode tags
        echo '[get_code_wall]';

    }
}
