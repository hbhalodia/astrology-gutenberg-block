import { registerPlugin } from "@wordpress/plugins";
import { PluginDocumentSettingPanel } from "@wordpress/edit-post";
import { __ } from "@wordpress/i18n";
import { useSelect, useDispatch } from "@wordpress/data";
import { useState } from "@wordpress/element";
import { TextControl, ComboboxControl, TextHighlight } from "@wordpress/components";
const { union, map } = lodash;

const RenderAstroCategoryAutoCompleteMeta = () => {

	const { AstroCategoryId, types } = useSelect( ( select ) => {

		const types         = select( 'core' ).getEntityRecords( 'taxonomy', 'category', { per_page: 20 } );
		return {
			AstroCategoryId: select( 'core/editor' ).getEditedPostAttribute( 'meta' )['astro_category_id'],
			types: union(
				[
					{
						'name': __( 'Select Category', 'astro-gutenberg-block' ),
						'id': 0,
					}
				],
				types,
			),
		};
	} );

	const { editPost } = useDispatch( 'core/editor' );

	const categoryList = map( types, ( { name, id } ) => {
		return {
			label: name,
			value: id,
		};
	} );

	const [ newAstroCategoryId, setNewAstroCategoryId ] = useState( AstroCategoryId );
	const [ newCategoryList, setNewCategoryList ] = useState( categoryList );

	const setNewAstroCategoryIdValue = ( value ) => {
		setNewAstroCategoryId( value );
		editPost( { meta: { astro_category_id: parseInt( value ) } } );
	}

	const setNewAstroCategoryFilteredOptions = ( value )=> {

		if ( '' === value ) {
			setNewCategoryList( categoryList );
		} else {
			let queryData = wp.data.select( 'core' ).getEntityRecords( 'taxonomy', 'category', { per_page: 5, search: value } );

			if ( null !== queryData && 'undefined' !== typeof queryData && 0 < queryData.length ) {

				let newList = map( queryData, ( { name, id } ) => {
					return {
						label: name,
						value: id,
					};
				} );
				setNewCategoryList( newList );
			}
		}
	}

	const fetchAstroCategoryName = ( value ) => {
		if ( 0 === AstroCategoryId ) {
			return __( 'AstroCategory Not Added', 'astro-gutenberg-block' );
		} else {
			if ( 0 !== value ) {
				const newData = wp.data.select( 'core' ).getEntityRecords( 'taxonomy', 'category', { include: [ parseInt( value ) ] } );

				if ( null !== newData && 'undefined' !== typeof newData && 0 < newData.length ) {
					return (
						<>
							<a href={ newData[0].link }>
								{ newData[0].name }
							</a>
						</>
					);
				} else {
					return __( 'Loading...', 'astro-gutenberg-block' );
				}
			} else {
				return __( 'Astro Category Not Added', 'astro-gutenberg-block' );
			}
		}
	}


	return (
		<>
			<ComboboxControl
				help={ __( 'Search Category to get Suggestions', 'astro-gutenberg-block' ) }
				value={ newAstroCategoryId }
				onChange={ ( value ) => setNewAstroCategoryIdValue( value ) }
				options={ newCategoryList }
				onFilterValueChange={ ( inputValue ) =>
					setNewAstroCategoryFilteredOptions( inputValue )
				}
			/>
			<br />
			{ fetchAstroCategoryName( newAstroCategoryId ) }
			<TextControl
				type="hidden"
				value={ 0 === AstroCategoryId ? 0 : AstroCategoryId }
				onChange={ ( value ) => editPost( { meta: { astro_category_id: parseInt( value ) } } ) }
			/>
		</>
	);
}

const AstroCategoryAutocomplete = () => (
	// Create sidebar's (drop-down) panel.
	<PluginDocumentSettingPanel
		name="astro_category_autocomplete"
		title={ __( 'Astro Category', 'astro-gutenberg-block' ) }
		className="astro-sign"
	>
		<RenderAstroCategoryAutoCompleteMeta />
	</PluginDocumentSettingPanel>
);

// Register sidebar's (drop-down) panel.
registerPlugin(
	'plugin-astro-category-autocomplete',
	{
		render: AstroCategoryAutocomplete,
		icon: null
	}
);
