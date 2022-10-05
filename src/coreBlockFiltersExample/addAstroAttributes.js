/**
 * This file is used to add the Astro common attributes to all the blocks.
 *
 * @package astro-gutenberg-block
 */

const AstroAttributes = ( settings, name ) => {

	// If core block is not paragraph then no need to add astro attributes.
	if ( name !== 'core/paragraph' ) {
		return settings;
	}

	const { attributes } = settings;
	return {
		...settings,
		attributes: {
			...attributes,
			isAstroBlockOn: {
				default: false,
				type: "boolean",
			},
			AstroSignName: {
				type: "string"
			}
		}
	};
};

export default AstroAttributes;
