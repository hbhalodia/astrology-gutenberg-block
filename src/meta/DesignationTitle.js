// Register the MetaField text to.
const { registerPlugin } = wp.plugins;
const { PluginDocumentSettingPanel } = wp.editPost;
const { __ } = wp.i18n;
const { TextControl } = wp.components;
const { useSelect, useDispatch } = wp.data;

const RenderDesginationTitleMeta = () => {

	const { desginationTitle } = useSelect( ( select ) => {
		return {
			desginationTitle: select('core/editor').getEditedPostAttribute( 'meta' )['designation_title'],
		}
	} );

	const { editPost } = useDispatch( 'core/editor' );

	// Add all input fields required in a meta-box here.
	return (
		<>
			<TextControl
				value={ desginationTitle }
				onChange={ ( value ) => editPost( { meta: { designation_title: value } } ) }
			/>
		</>
	)
}

const PluginDesginationTitle = () => (
	// Create sidebar's (drop-down) panel.
	<PluginDocumentSettingPanel
		name="desgination_title"
		title={ __( 'Designantion Title', 'rtcamp-features' ) }
		className="desgination-title"
	>
		<RenderDesginationTitleMeta />
	</PluginDocumentSettingPanel>
);

// Register sidebar's (drop-down) panel.
registerPlugin(
	'plugin-designation-title',
	{
		render: PluginDesginationTitle,
		icon: null
	}
);
