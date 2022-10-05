// const { __ } = wp.i18n;
// const { PanelBody, ToggleControl, TextControl } = wp.components;
// const { InspectorControls } = wp.blockEditor;
// const { Fragment } = wp.element;
// const { createHigherOrderComponent } = wp.compose;

import { __ } from "@wordpress/i18n";
import { PanelBody, ToggleControl, TextControl } from "@wordpress/components";
import { InspectorControls } from "@wordpress/block-editor";
import { Fragment } from "@wordpress/element";
import { createHigherOrderComponent } from '@wordpress/compose';

export default createHigherOrderComponent( ( BlockEdit ) => {

	return ( props ) => {
		const {
			name,
			attributes: {
				isAstroBlockOn,
				AstroSignName
			},
			setAttributes
		} = props;

		if ( name != 'core/paragraph' ) {
			return (
				<BlockEdit { ...props } />
			);
		}

		return (
			<Fragment>
				<BlockEdit { ...props } />
				<InspectorControls>
					<PanelBody
						title={ __( 'Astro Block Info', 'astro-gutenberg-block' ) }
						icon= { null }
						initialOpen={ true }
					>
						<ToggleControl
							label={ __( 'Enable Astro on Paragraph', 'astro-gutenberg-block' ) }
							checked={ isAstroBlockOn }
							onChange={ ( value ) => setAttributes( { isAstroBlockOn: value } ) }
							help={ __( 'Enable this to Add astro block ', 'astro-gutenberg-block' ) }
						/>
						<TextControl
							label={ __( 'Enter Sign Name', 'astro-gutenberg-block' ) }
							value={ AstroSignName }
							onChange={ ( value ) => setAttributes( { AstroSignName: value } ) }
						/>
					</PanelBody>
				</InspectorControls>
			</Fragment>
		);
	};
}, 'AddControlsForAstroAttributes' );
