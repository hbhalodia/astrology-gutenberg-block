import { InspectorControls, useBlockProps } from '@wordpress/block-editor';
import { ToggleControl, PanelBody } from '@wordpress/components';
import { __ } from '@wordpress/i18n';

export default function Edit( { attributes, setAttributes } ) {

	const { postId, ImageOnLeft, DisableDate, DisableExcerpt } = attributes;

	const onImagePositionChanged = () => {
		setAttributes( { ImageOnLeft: ! ImageOnLeft } );
	};

	const onDisableDate = () => {
		setAttributes( { DisableDate: ! DisableDate } );
	}

	const onDisableExcerpt = () => {
		setAttributes( { DisableExcerpt: ! DisableExcerpt } );
	}

	const blockProps = useBlockProps();

	return (
		<>
			<InspectorControls>
				<PanelBody title={ __( 'Single Block Post Settings', 'astro-gutenberg-block' ) }>

					<ToggleControl
						label="Featured Image Position"
						help={ ImageOnLeft ? 'Toggle to align image on right side' : 'Toggle to align image on left side' }
						checked={ ImageOnLeft }
						onChange={ onImagePositionChanged }
					/>

					<ToggleControl
						label="Disable Excerpt"
						help={ DisableExcerpt ? 'Toggle to enable excerpt' : 'Toggle to disable excerpt' }
						checked={ DisableExcerpt }
						onChange={ onDisableExcerpt }
					/>

					<ToggleControl
						label="Enable Excerpt"
						help={ DisableDate ? 'Toggle to enable date' : 'Toggle to disable date' }
						checked={ DisableDate }
						onChange={ onDisableDate }
					/>
				</PanelBody>
			</InspectorControls>

			<div { ...blockProps }>
				Here would be single block in grid pattern to add Image and Its content.
			</div>
		</>
	)
}