/**
 * Registers a new block provided a unique name and an object defining its behavior.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/block-api/block-registration/
 */
import { registerBlockType } from '@wordpress/blocks';

/**
 * Lets webpack process CSS, SASS or SCSS files referenced in JavaScript files.
 * All files containing `style` keyword are bundled together. The code used
 * gets applied both to the front of your site and to the editor.
 *
 * @see https://www.npmjs.com/package/@wordpress/scripts#using-css
 */
import './style.scss';

/**
 * Internal dependencies
 */
import Edit from './edit';
import Save from './save';
import metadata from './block.json';

/**
 * Every block starts by registering a new block type definition.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/block-api/block-registration/
 */
registerBlockType( metadata.name, {
	/**
	 * @see ./edit.js
	 */
	edit: Edit,
	/**
	 * @see ./save.js
	 */
	save: Save,
} );

// Add meta.
import "../gutenberg-meta/index";

// Add block filters.
import "../core-block-filters/index";

// Working on Adding Block Variations.
wp.blocks.registerBlockVariation(
	'core/quote',
	{
		name: 'fancy-quote',
		title: 'Fancy Quote',
	},
);

wp.blocks.registerBlockVariation(
	'core/buttons',
	[
		{
			name: 'wide',
			title: 'Wide Buttons',
			attributes: {
				className: 'is-wide'
			},
		},
		{
			name: 'full',
			title: 'Full Buttons',
			attributes: {
				className: 'is-full'
			},
		}
	]
);

wp.blocks.registerBlockVariation(
	'core/columns', {
		name: 'project-intro',
		title: 'Project Intro',
		scope: ['inserter'],
		icon: 'portfolio',
		innerBlocks: [
			['core/column', {}, [
					['core/heading', { level: 2, placeholder: 'Project Title' }],
				]
			],
			['core/column', {}, [
					['core/heading', { level: 3, content: 'Client' }],
					['core/paragraph', { placeholder: 'Enter client info' }],
				]
			],
			['core/column', {}, [
					['core/heading', { level: 3, content: 'My Role' }],
					['core/paragraph', { placeholder: 'Describe your role' }],
				]
			],
		],
	}
);

wp.blocks.registerBlockVariation(
	'core/columns', {
		name: 'four-columns',
		title: 'Four columns; equal split',
		icon: <svg width="48" height="48" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg" role="img" aria-hidden="true" focusable="false"><path fill-rule="nonzero" d="M39 12a2 2 0 011.995 1.85L41 14v20a2 2 0 01-1.85 1.995L39 36H9a2 2 0 01-1.995-1.85L7 34V14a2 2 0 011.85-1.995L9 12h30zm-24 2H9v20h6V14zm8 0h-6v20h6V14zm2 0v20h6V14h-6zm8 20h6V14h-6v20z" /></svg>,
		scope: ['block'], // Highlight
		innerBlocks: [
			['core/column'],
			['core/column'],
			['core/column'],
			['core/column'],
		],
	}
);
