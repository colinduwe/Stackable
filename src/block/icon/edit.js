/** Internal dependencies
 */
import { IconStyles } from './style'
/**
 * External dependencies
 */
import classnames from 'classnames'
import { omit } from 'lodash'
import { version as VERSION, i18n } from 'stackable'
import {
	InspectorTabs,
	InspectorAdvancedControls,
	PanelAdvancedSettings,
	AdvancedTextControl,
} from '~stackable/components'
import {
	withBlockAttributeContext, withBlockWrapper, withQueryLoopContext,
} from '~stackable/higher-order'
import {
	BlockDiv,
	useGeneratedCss,
	Icon,
	getAlignmentClasses,
	Alignment,
	Advanced,
	CustomCSS,
	Responsive,
	CustomAttributes,
	EffectsAnimations,
	ConditionalDisplay,
	MarginBottom,
	Link,
	Transform,
} from '~stackable/block-components'

/**
 * WordPress dependencies
 */
import { compose } from '@wordpress/compose'
import { Fragment } from '@wordpress/element'
import { __ } from '@wordpress/i18n'
import { addFilter, applyFilters } from '@wordpress/hooks'
import { defaultIcon } from './schema'

const Edit = props => {
	const { className, attributes } = props

	useGeneratedCss( props.attributes )

	const blockAlignmentClass = getAlignmentClasses( attributes )

	const blockClassNames = classnames( [
		className,
		'stk-block-icon',
		blockAlignmentClass,
	] )

	const derivedIcon = applyFilters( 'stackable.block-component.icon.default', defaultIcon )

	return (
		<Fragment>
			<InspectorTabs />

			<Alignment.InspectorControls />
			<BlockDiv.InspectorControls />
			<Advanced.InspectorControls />
			<Transform.InspectorControls />

			<InspectorAdvancedControls>
				<PanelAdvancedSettings
					title={ __( 'Accessibility', i18n ) }
					id="accessibility"
				>
					<AdvancedTextControl
						isDynamic={ false }
						label={ __( 'Icon Label', i18n ) }
						attribute="ariaLabel"
					/>
				</PanelAdvancedSettings>
			</InspectorAdvancedControls>

			<EffectsAnimations.InspectorControls />
			<Icon.InspectorControls initialOpen={ true } hasMultiColor={ true } defaultValue={ derivedIcon } />
			<Link.InspectorControls hasToggle={ true } />
			<CustomAttributes.InspectorControls />
			<CustomCSS.InspectorControls mainBlockClass="stk-block-icon" />
			<Responsive.InspectorControls />
			<ConditionalDisplay.InspectorControls />

			<IconStyles version={ VERSION } />
			<CustomCSS mainBlockClass="stk-block-icon" />
			<BlockDiv className={ blockClassNames } >
				<Link linkTrigger=".stk--inner-svg">
					<Icon />
				</Link>
			</BlockDiv>
			<MarginBottom />
		</Fragment>
	)
}

export default compose(
	withBlockWrapper,
	withQueryLoopContext,
	withBlockAttributeContext,
)( Edit )

// When saving block styles, don't save the icons used by the block.
//
// We need to prevent this because the saved default icon also gets applied to
// other blocks such as the blockquote block and the accordion block.
//
// TODO: if we can ensure that the icon block's default icon doesn't get applied
// to those other blocks, then we can remove this.
addFilter( 'stackable.icon.design.filtered-block-attributes', 'stackable/table-of-contents', attributes => {
	return omit( attributes, [ 'icon', 'icon2' ] )
} )
