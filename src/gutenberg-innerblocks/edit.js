import { InnerBlocks, useBlockProps } from '@wordpress/block-editor';

export default function Edit( { attributes, setAttributes } ) {
	const blockProps     = useBlockProps();
	const ALLOWED_BLOCKS = [
		'core/image',
		'core/paragraph',
		'core/columns',
		'core/heading',
	];
	const TEMPLATE = [
		[
			'core/columns', {},
			[
				[
					'core/column', {},
					[
						[ 'core/image' ],
					]
				],
				[ 'core/column', {},
					[
						[
							'core/heading', {
								level: 3,
								placeholder: 'Enter title here..'
							}
						],
						[
							'core/paragraph', {
								placeholder: 'Enter content here..'
							}
						],
					]
				],
			]
		],
		[ 'create-block/single-post-block' ],
	];



	return (
		<div { ...blockProps }>
			<InnerBlocks template={ TEMPLATE } templateLock={'all'} allowedBlocks={ ALLOWED_BLOCKS } />
		</div>
	);
}
