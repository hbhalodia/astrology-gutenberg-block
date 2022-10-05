const { addFilter } = wp.hooks;

import AstroAttributes from "./addAstroAttributes";
import AddControlsForAstroAttributes from "./addControlsForAstroAttributes";
import AddAstroPrefixSign from "./addAstroPrefixSign";

addFilter(
	'blocks.registerBlockType',
	'astro-gutenberg-block/astro-attributes-test',
	AstroAttributes
);

addFilter(
	'editor.BlockEdit',
	'astro-gutenberg-block/astro-attributes-test-controls',
	AddControlsForAstroAttributes
);

addFilter(
	'editor.BlockListBlock',
	'astro-gutenberg-block/astro-prefix-to-core-paragraph',
	AddAstroPrefixSign
);
