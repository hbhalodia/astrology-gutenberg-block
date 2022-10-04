// Register the MetaField text to.
const { registerPlugin } = wp.plugins;
const { PluginDocumentSettingPanel } = wp.editPost;
const { __ } = wp.i18n;
const { TextControl } = wp.components;
const { useSelect, useDispatch } = wp.data;

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
