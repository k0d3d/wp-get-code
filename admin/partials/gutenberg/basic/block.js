/**
 * Hello World: Step 1
 *
 * Simple block, renders and saves the same content without interactivity.
 *
 * Using inline styles - no external stylesheet needed.  Not recommended
 * because all of these styles will appear in `post_content`.
 */
( function( blocks, i18n, element, blockEditor ) {
	var el = element.createElement;
	var __ = i18n.__;
	var useBlockProps = blockEditor.useBlockProps;

	var blockStyle = {
		color: '#000',
	};

	blocks.registerBlockType( 'get-code/get-code-basic', {
		icon: 'get-code-icon',
		edit: function() {
			return el(
				'p',
				useBlockProps( { style: blockStyle } ),
				__( '[get_code_wall]',
					'get-code'
				)
			);
		},
		save: function() {
			return el(
				'p',
				useBlockProps.save( {} ),
				__( '[get_code_wall]',
					'get-code'
				)
			);
		},
	} );
}( window.wp.blocks, window.wp.i18n, window.wp.element, window.wp.blockEditor ) );
