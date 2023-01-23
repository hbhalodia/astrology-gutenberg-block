const { addFilter } = wp.hooks;

import AstroAttributes from "./addAstroAttributes";
import AddControlsForAstroAttributes from "./addControlsForAstroAttributes";
import AddAstroPrefixSign from "./addAstroPrefixSign";

addFilter(
	'blocks.registerBlockType',
	'astro-gutenberg-block/astro-attributes-test',
	AstroAttributes
);

addFilter(
	'editor.BlockEdit',
	'astro-gutenberg-block/astro-attributes-test-controls',
	AddControlsForAstroAttributes
);

addFilter(
	'editor.BlockListBlock',
	'astro-gutenberg-block/astro-prefix-to-core-paragraph',
	AddAstroPrefixSign
);

function wrapCoverBlockInContainer( element, blockType, attributes ) {
	// skip if element is undefined
	if ( ! element ) {
		return;
	}

	// only apply to cover blocks
	if ( blockType.name !== 'core/cover' ) {
		return element;
	}

	// return the element wrapped in a div
	return <div className="cover-block-wrapper">{ element }</div>;
}

addFilter(
	'blocks.getSaveElement',
	'my-plugin/wrap-cover-block-in-container',
	wrapCoverBlockInContainer
);

function addBackgroundColorStyle( props, type ) {
	if ( type.name !== 'core/cover' ) {
		return props;
	}
	return lodash.assign( props, { style: { backgroundColor: 'pink' } } );
}

addFilter(
	'blocks.getSaveContent.extraProps',
	'my-plugin/add-background-color-style',
	addBackgroundColorStyle
);

// Our filter function
function setBlockCustomClassName( className, blockName ) {
	return blockName === 'core/cover' ? 'my-external-class-name' : className;
}

// Adding the filter
addFilter(
	'blocks.getBlockDefaultClassName',
	'my-plugin/set-block-custom-class-name',
	setBlockCustomClassName
);

const { createHigherOrderComponent } = wp.compose;

const withClientIdClassName = createHigherOrderComponent(
    ( BlockListBlock ) => {
        return ( props ) => {
			const { name } = props;

			if ( name !== 'core/cover' ) {
				return (
					<BlockListBlock
						{ ...props }
					/>
				)
			}

			console.log( 'Yes' );

            return (
				<div className="cover-block-wrapper">
					<BlockListBlock
						{ ...props }
					/>
				</div>
            );
        };
    },
    'withClientIdClassName'
);

addFilter(
	'editor.BlockListBlock',
	'my-plugin/with-client-id-class-name',
	withClientIdClassName
);

import domReady from '@wordpress/dom-ready';
import { unregisterBlockType } from '@wordpress/blocks';

domReady( function () {
    unregisterBlockType( 'core/cover' );
} );

var customPreviewMessage = function () {
    return '<b>Post preview is being generated!</b>';
};

wp.hooks.addFilter(
    'editor.PostPreview.interstitialMarkup',
    'my-plugin/custom-preview-message',
    customPreviewMessage
);
