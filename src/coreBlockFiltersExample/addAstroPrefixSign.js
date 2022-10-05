const { createHigherOrderComponent } = wp.compose;
const { Fragment } = wp.element;

export default createHigherOrderComponent( ( Block ) => {

	return ( props ) => {
		const {
			name,
			attributes: {
				isAstroBlockOn,
				AstroSignName
			}
		} = props;

		if ( name != 'core/paragraph' ) {
			return (
				<Block { ...props } />
			);
		}

		if ( isAstroBlockOn && '' !== AstroSignName ) {
			return (
				<Fragment>
					<p>
						Astro Sign is - { AstroSignName }
					</p>
					<br></br>
					<Block { ...props } />
				</Fragment>
			);
		}

		return (
			<Block { ...props } />
		);
	};
}, 'AddAstroPrefixSign' );
