import { InspectorControls, useBlockProps } from '@wordpress/block-editor';
import { ToggleControl, PanelBody, ComboboxControl } from '@wordpress/components';
import { __ } from '@wordpress/i18n';
import { useSelect, useDispatch } from "@wordpress/data";
import { useState } from "@wordpress/element";
import { ServerSideRender } from "@wordpress/editor";
const { union, map } = lodash;

export default function Edit( { attributes, setAttributes } ) {

	const { postId, ImageOnLeft, DisableDate, DisableExcerpt } = attributes;

	const { posts } = useSelect( ( select ) => {
		const posts = select( 'core' ).getEntityRecords( 'postType', 'post', { per_page: 10 } );
		return {
			posts: union(
				[
					{
						'title': __( 'Select Post', 'astro-gutenberg-block' ),
						'id': 0,
					}
				],
				posts,
			)
		};
	} );

	const postList = map( posts, ( { title, title: { raw }, id } ) => {
		return ( 'undefined' === typeof title.raw ) ? {
			label: title,
			value: id,
		} : {
			label: raw,
			value: id,
		};
	} );

	const blockProps = useBlockProps();

	const onImagePositionChanged = () => {
		setAttributes( { ImageOnLeft: ! ImageOnLeft } );
	};

	const onDisableDate = () => {
		setAttributes( { DisableDate: ! DisableDate } );
	}

	const onDisableExcerpt = () => {
		setAttributes( { DisableExcerpt: ! DisableExcerpt } );
	}

	const [ newPostId, setNewPostId ] = useState( postId );
	const [ newPostList, setNewPostList ] = useState( postList );

	const setNewPostIdValue = ( value ) => {
		if ( null == value ) {
			value = 0;
		}
		setAttributes( { postId: parseInt( value, 10 ) } );
		setNewPostId( parseInt( value, 10 ) );
	};

	const setNewPostLists = ( value ) => {
		if ( '' === value ) {
			setNewPostList( postList );
		} else {
			let queryData = wp.data.select( 'core' ).getEntityRecords( 'postType', 'post', { per_page: 5, search: value } );

			if ( null !== queryData && 'undefined' !== typeof queryData && 0 < queryData.length ) {

				let newList = map( queryData, ( { title: { raw }, id } ) => {
					return {
						label: raw,
						value: id,
					};
				} );
				setNewPostList( newList );
			}
		}
	}

	return (
		<>
			<InspectorControls>
				<PanelBody title={ __( 'Single Block Post Settings', 'astro-gutenberg-block' ) }>

					<ComboboxControl
						help={ __( 'Search Posts to get Suggestions', 'astro-gutenberg-block' ) }
						value={ newPostId }
						onChange={ ( value ) => setNewPostIdValue( value ) }
						options={ newPostList }
						onFilterValueChange={ ( inputValue ) =>
							setNewPostLists( inputValue )
						}
					/>

					<ToggleControl
						label={ __( "Featured Image Position", "astro-gutenberg-block" ) }
						help={ ImageOnLeft ? 'Toggle to align image on right side' : 'Toggle to align image on left side' }
						checked={ ImageOnLeft }
						onChange={ onImagePositionChanged }
					/>

					<ToggleControl
						label={ __( "Disable Excerpt", "astro-gutenberg-block" ) }
						help={ DisableExcerpt ? 'Toggle to enable excerpt' : 'Toggle to disable excerpt' }
						checked={ DisableExcerpt }
						onChange={ onDisableExcerpt }
					/>

					<ToggleControl
						label={ __( "Disable Date", "astro-gutenberg-block" ) }
						help={ DisableDate ? 'Toggle to enable date' : 'Toggle to disable date' }
						checked={ DisableDate }
						onChange={ onDisableDate }
					/>
				</PanelBody>
			</InspectorControls>

			{
				postId != 0 ?
				(
					 <ServerSideRender
						block="create-block/single-post-block"
						attributes={ attributes }
					 />
				) : (
					<div { ...blockProps }> Please Select Post from Panel. </div>
				)
			}
		</>
	)
}