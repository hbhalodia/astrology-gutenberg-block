const { registerPlugin } = wp.plugins;
const { PluginDocumentSettingPanel } = wp.editPost;
const { __ } = wp.i18n;
const { Button, Spinner } = wp.components;
const { useSelect, useDispatch } = wp.data;
const { MediaUpload, MediaUploadCheck } = wp.editor;

const RenderAstroSignImageMeta = () => {

	const { AstroSignImage, bgImage } = useSelect( ( select ) => {
		const { getMedia } = select( 'core' );
		const imageId      = select('core/editor').getEditedPostAttribute( 'meta' )['astro_sign_image'];

		return {
			// Get meta value of meta-fields & store them in attributes.
			AstroSignImage: imageId,
			bgImage: imageId ? getMedia( imageId ) : null,
		}
	} );

	const { editPost } = useDispatch( 'core/editor' );

	const handleClick = () => {
		editPost( { meta: { astro_sign_image: 0 } } );
	}

	const ALLOWED_MEDIA_TYPES = [ 'image' ];

	// Add all input fields required in a meta-box here.
	return (
		<>
			<MediaUploadCheck>
				<MediaUpload
					title={ __( 'Astro Sign Image', 'astro-gutenberg-block' ) }
					onSelect={ ( media ) => editPost( { meta: { astro_sign_image: media.id } } ) }
					allowedTypes={ ALLOWED_MEDIA_TYPES }
					value={ AstroSignImage }
					render={ ( { open } ) => (
						<Button
							className={ ! AstroSignImage ? 'editor-post-featured-image__toggle' : 'editor-post-featured-image__preview' }
							onClick={ open }>
							{ ! AstroSignImage && ( __( 'Set Astro Sign Image', 'astro-gutenberg-block' ) ) }
							{ !! AstroSignImage && ! bgImage && <Spinner /> }
							{ !! AstroSignImage && bgImage &&
								<img width="100" height="100"  src={ bgImage.source_url } alt={ __( 'Astro Sign Image', 'astro-gutenberg-block' ) } />
							}
						</Button>
					) }
				/>
			</MediaUploadCheck>
			<br />
			<div>{ !! AstroSignImage && bgImage && 'Img: ' + bgImage.title.rendered }</div>
			<br />
			{ !! AstroSignImage && !! bgImage &&
				<MediaUploadCheck>
					<MediaUpload
						title={ __( 'Astro Sign Image', 'astro-gutenberg-block' ) }
						onSelect={ ( media ) => editPost( { meta: { astro_sign_image: media.id } } ) }
						allowedTypes={ ALLOWED_MEDIA_TYPES }
						value={ AstroSignImage }
						render={ ( { open } ) => (
							<Button onClick={ open } isDefault isLarge>
								{ __( 'Replace Astro Image', 'astro-gutenberg-block' ) }
							</Button>
						) }
					/>
				</MediaUploadCheck>
			}
			<br /><br />
			{
				!! AstroSignImage && bgImage &&
				<MediaUploadCheck>
					<Button onClick={ handleClick } isLink isDestructive>
						{ __( 'Remove Image', 'astro-gutenberg-block' ) }
					</Button>
				</MediaUploadCheck>
			}
		</>
	)
}

const PluginAstroSignImage = () => (
	// Create sidebar's (drop-down) panel.
	<PluginDocumentSettingPanel
		name="astro_sign_image"
		title={ __( 'Astro Image', 'astro-gutenberg-block' ) }
		className="case-study-background"
	>
		<RenderAstroSignImageMeta />
	</PluginDocumentSettingPanel>
);

// Register sidebar's (drop-down) panel.
registerPlugin(
	'plugin-astro-sign-image',
	{
		render: PluginAstroSignImage,
		icon: null
	}
);
