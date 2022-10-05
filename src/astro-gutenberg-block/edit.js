/**
 * Retrieves the translation of text.
 *
 * @see https://developer.wordpress.org/block-editor/packages/packages-i18n/
 */
import { __ } from '@wordpress/i18n';

import axios from 'axios';

/**
 * @see https://developer.wordpress.org/block-editor/reference-guides/packages/packages-block-editor/#inspectorcontrols
 */
 import { InspectorControls, useBlockProps } from '@wordpress/block-editor';

/**
 * Lets webpack process CSS, SASS or SCSS files referenced in JavaScript files.
 * Those files can contain any CSS code that gets applied to the editor.
 *
 * @see https://www.npmjs.com/package/@wordpress/scripts#using-css
 */
import './editor.scss';

import { SelectControl, PanelBody } from '@wordpress/components';

/**
 * The edit function describes the structure of your block in the context of the
 * editor. This represents what the editor will render when the block is used.
 *
 * @see https://developer.wordpress.org/block-editor/developers/block-api/block-edit-save/#edit
 *
 * @return {WPElement} Element to render.
 */
export default function Edit( { attributes, setAttributes } ) {

	const { astroSign, astroDuration, astroCategory, astroDescription, astroZodiacIcon } = attributes;

	const zodiacIconsArray = {
		aries      : '&#9800;',
		taurus     : '&#9801;',
		gemini     : '&#9802;',
		cancer     : '&#9803;',
		leo        : '&#9804;',
		virgo      : '&#9805;',
		libra      : '&#9806;',
		scorpio    : '&#9807;',
		sagittarius: '&#9808;',
		capricorn  : '&#9809;',
		aquarius   : '&#9810;',
		pisces     : '&#9811;',
	}

	const astroSignArray = {
		aries      : 'Aries',
		taurus     : 'Taurus',
		gemini     : 'Gemini',
		cancer     : 'Cancer',
		leo        : 'Leo',
		virgo      : 'Virgo',
		libra      : 'Libra',
		scorpio    : 'Scorpio',
		sagittarius: 'Sagittarius',
		capricorn  : 'Capricorn',
		aquarius   : 'Aquarius',
		pisces     : 'Pisces',
	};

	const astroDurationArray = {
		today  : 'Daily',
		weekly : 'Weekly',
		monthly: 'Monthly',
	};

	const astroCategoryArray = {
		nocategory: 'Deafult',
		career    : 'Career',
		love      : 'Love'
	};

	const getSelectControlOption = ( data ) => {
		const selectControlOptions = [];

		selectControlOptions.push(
			{
				label: 'Select',
				value: ''
			}
		);

		for ( const key in data ) {
			selectControlOptions.push(
				{
					label: data[ key ],
					value: key
				}
			);
		}

		return selectControlOptions;
	};

	function fetchHoroscopeDetails( astroSign, astroDuration, astroCategory ) {
		console.log( 'Yes' );
		try {
			let urlParam = '';

			if (
				( 'monthly' === astroDuration || 'weekly' === astroDuration )
				&& ( 'career' === astroCategory )
			) {
				urlParam = `horoscope-${astroCategory}-${astroDuration}/${astroSign}/`;
			} else if ( 'today' === astroDuration && 'career' === astroCategory ) {
				urlParam = `horoscope-${astroCategory}/${astroSign}/${astroDuration}/`;
			}

			if (
				( 'monthly' === astroDuration || 'weekly' === astroDuration )
				&& ( 'love' === astroCategory )
			) {
				urlParam = `horoscope-${astroCategory}-${astroDuration}/${astroSign}/couple/`;
			} else if ( 'today' === astroDuration && 'love' === astroCategory ) {
				urlParam = `horoscope-${astroCategory}/${astroSign}/today/`;
			}

			if (
				( 'monthly' === astroDuration || 'weekly' === astroDuration )
				&& ( 'nocategory' === astroCategory )
			) {
				urlParam = `horoscope-${astroDuration}/${astroSign}/`;
			} else if ( 'today' === astroDuration && 'nocategory' === astroCategory ) {
				urlParam = `horoscope/${astroSign}/today/`;
			}

			const options = {
				method: 'GET',
				url: 'https://astro-daily-live-horoscope.p.rapidapi.com/' + urlParam,
				headers: {
					'X-RapidAPI-Key': '81a01fa739msh30aff6efa9715e7p1d78c5jsn08e71a376f0c',
					'X-RapidAPI-Host': 'astro-daily-live-horoscope.p.rapidapi.com'
				}
			};

			axios.request( options ).then( function ( response ) {
				let newVal = response.data[ astroSign ];
				setAttributes( { astroDescription: newVal } );
			} ).catch(function ( error ) {
				console.log( error );
				setAttributes( { astroDescription: 'Something Went Wrong..' } );
			} );
		} catch (error) {
			console.log( error );
		}
	}

	const onChangeHoroscoperZodiac = ( newValue ) => {
		setAttributes( { astroSign: newValue } );
		setAttributes( { astroZodiacIcon: zodiacIconsArray[ newValue ] } );
		fetchHoroscopeDetails( newValue, astroDuration, astroCategory );
	};

	const onChangeHoroscopeDuration = ( newValue ) => {
		setAttributes( { astroDuration: newValue } );
		fetchHoroscopeDetails( astroSign, newValue, astroCategory );
	};

	const onChangeHoroscopeCategory = ( newValue ) => {
		setAttributes( { astroCategory: newValue } );
		fetchHoroscopeDetails( astroSign, astroDuration, newValue );
	};

	return (
		<>
			<InspectorControls>
				<PanelBody title={ __( 'Block Settings', 'learn-gutenberg' ) }>

					<SelectControl
						label="Horoscope Zodiac Sign"
						value={ astroSign }
						options={ getSelectControlOption( astroSignArray ) }
						onChange={ onChangeHoroscoperZodiac }
					/>

					<SelectControl
						label="Horoscope Duration"
						value={ astroDuration }
						options={ getSelectControlOption( astroDurationArray ) }
						onChange={ onChangeHoroscopeDuration }
					/>

					<SelectControl
						label="Horoscope Category"
						value={ astroCategory }
						options={ getSelectControlOption( astroCategoryArray ) }
						onChange={ onChangeHoroscopeCategory }
					/>
				</PanelBody>
			</InspectorControls>

			<div className='container'>
				<>
					<h1 className='horoscopeHeading'>{ astroZodiacIcon || '' } { astroSignArray[ astroSign ] || 'Select Suitable Zodiac' }</h1>
					<h3 className='horoscopeCategoryName'>{ astroCategoryArray[ astroCategory ] || 'Select Suitable Category' }</h3><h4 className='horoscopeDuration'>{ astroDurationArray[ astroDuration] || 'Select Suitable Duration' }</h4>
					<p className='horoscopeDescription'>{ astroDescription }</p>
				</>
			</div>
		</>
	)
}
