import { registerPlugin } from "@wordpress/plugins";
import { PluginDocumentSettingPanel } from "@wordpress/edit-post";
import { __ } from "@wordpress/i18n";
import { TextControl } from "@wordpress/components";
import { useSelect, useDispatch } from "@wordpress/data";

const RenderAstroSignMeta = () => {

	const { AstroSign } = useSelect( ( select ) => {
		return {
			AstroSign: select('core/editor').getEditedPostAttribute( 'meta' )['astro_sign'],
		}
	} );

	const { editPost } = useDispatch( 'core/editor' );

	// Add all input fields required in a meta-box here.
	return (
		<>
			<TextControl
				value={ AstroSign }
				onChange={ ( value ) => editPost( { meta: { astro_sign: value } } ) }
			/>
		</>
	)
}

const PluginAstroSign = () => (
	// Create sidebar's (drop-down) panel.
	<PluginDocumentSettingPanel
		name="astro_sign"
		title={ __( 'Astro Sign', 'astro-gutenberg-block' ) }
		className="astro-sign"
	>
		<RenderAstroSignMeta />
	</PluginDocumentSettingPanel>
);

// Register sidebar's (drop-down) panel.
registerPlugin(
	'plugin-astro-sign',
	{
		render: PluginAstroSign,
		icon: null
	}
);
