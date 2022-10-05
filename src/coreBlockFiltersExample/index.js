const { addFilter } = wp.hooks;

import { AstroAttributes } from "./addAstroAttributes";

addFilter(
	'blocks.registerBlockType',
	'astro-gutenberg-block/astro-attributes-test',
	AstroAttributes
);
