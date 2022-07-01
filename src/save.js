/**
 * Retrieves the translation of text.
 *
 * @see https://developer.wordpress.org/block-editor/packages/packages-i18n/
 */
import { __ } from '@wordpress/i18n';

/**
 * React hook that is used to mark the block wrapper element.
 * It provides all the necessary props like the class name.
 *
 * @see https://developer.wordpress.org/block-editor/packages/packages-block-editor/#useBlockProps
 */
import { useBlockProps } from '@wordpress/block-editor';

/**
 * The save function defines the way in which the different attributes should
 * be combined into the final markup, which is then serialized by the block
 * editor into `post_content`.
 *
 * @see https://developer.wordpress.org/block-editor/developers/block-api/block-edit-save/#save
 *
 * @return {WPElement} Element to render.
 */
export default function save( props ) {
	const { attributes } = props;
	const { astroSign, astroDuration, astroCategory, astroDescription } = attributes;


	return (
		<>
			<div className='container'>
				<h1 className='horoscopeHeading'>{ astroSign || 'Select Suitable Zodiac' }</h1>
				<h3 className='categoryName'>{ astroCategory || 'Select Suitable Category' }</h3>
				<h4 className='astroDuration'>{ astroDuration || 'Select Suitable Duration' }</h4>
				<p className='HoroscopeDescription'>{ astroDescription }</p>
			</div>
		</>
	);
}
