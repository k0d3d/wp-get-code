const { registerBlockType } = wp.blocks;
const { TextControl } = wp.components;

registerBlockType('gutenberg/get-code-wall-block', {
    title: 'Get Code Wall Block',
    icon: 'shield',
    category: 'common',
    attributes: {
        shortcodeContent: {
            type: 'string',
            default: 'Your [get_code_wall] content goes here.',
        },
    },
    edit: function (props) {
        const { attributes, setAttributes } = props;
        const { shortcodeContent } = attributes;

        function onChangeContent(newContent) {
            setAttributes({ shortcodeContent: newContent });
        }

        return (
            <div>
                <TextControl
                    label="Shortcode Content"
                    value={shortcodeContent}
                    onChange={onChangeContent}
                />
            </div>
        );
    },
    save: function () {
        return null; // The block content is handled dynamically in PHP
    },
});
