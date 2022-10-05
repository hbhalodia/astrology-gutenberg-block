const { addFilter } = wp.hooks;

import AstroAttributes from "./addAstroAttributes";
import AddControlsForAstroAttributes from "./addControlsForAstroAttributes";

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
