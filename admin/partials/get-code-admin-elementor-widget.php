<?php
namespace GetCode\Widgets;

use Elementor\Widget_Base;
use Elementor\Controls_Manager;

class Get_Code_Elementor_Widget extends Widget_Base {

	public function get_name() {
		return 'hello_world_widget_1';
	}

	public function get_title() {
		return esc_html__( 'Hello World 1', 'elementor-addon' );
	}

	public function get_icon() {
		return 'eicon-code';
	}

	public function get_categories() {
		return [ 'basic' ];
	}

	public function get_keywords() {
		return [ 'hello', 'world' ];
	}

	protected function render() {
		?>

		<p> Hello World </p>

		<?php
	}
}