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
		backgroundColor: '#900',
		color: '#fff',
		padding: '20px',
	};

	blocks.registerBlockType( 'get-code/example-01-basic', {
		edit: function() {
			return el(
				'p',
				useBlockProps( { style: blockStyle } ),
				__( 'Hello World, step 1 (from the editor).',
					'get-code'
				)
			);
		},
		save: function() {
			return el(
				'p',
				useBlockProps.save( { style: blockStyle } ),
				__( 'Hello World, step 1 (from the frontend).',
					'get-code'
				)
			);
		},
	} );
}( window.wp.blocks, window.wp.i18n, window.wp.element, window.wp.blockEditor ) );
