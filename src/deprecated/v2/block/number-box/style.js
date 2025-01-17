/**
 * External dependencies
 */
import {
	appendImportantAll,
	createTypographyStyles,
	createResponsiveStyles,
	createBorderStyleSet,
	marginLeftAlign,
	marginRightAlign,
	whiteIfDark,
	whiteIfDarkBlackIfLight,
	appendImportant,
	__getValue,
} from '~stackable/util'
import {
	createBackgroundStyleSet,
} from '../../util'

/**
 * Internal dependencies
 */
import { showOptions } from './util'
import deepmerge from 'deepmerge'

export const createStyles = props => {
	const getValue = __getValue( props.attributes )

	const styles = []

	const {
		design = 'basic',
		columnBackgroundColor = '',
	} = props.attributes

	const show = showOptions( props )

	// General.
	styles.push( {
		'.ugb-number-box__item': {
			borderRadius: design !== 'plain' ? getValue( 'borderRadius', '%spx !important' ) : undefined,
		},
	} )

	if ( show.border ) {
		styles.push( {
			...createBorderStyleSet( 'column%s', '.ugb-number-box__item', props.attributes ),
		} )
	}

	// Column Background.
	const columnBackgroundOptions = {
		importantBackgroundColor: true,
	}
	styles.push( {
		...( show.columnBackground ? createBackgroundStyleSet( 'column%s', 'ugb-number-box__item', props.attributes, columnBackgroundOptions ) : {} ),
	} )

	// Container
	const {
		columnPaddingUnit = 'px',
		tabletColumnPaddingUnit = 'px',
		mobileColumnPaddingUnit = 'px',
	} = props.attributes
	styles.push( {
		saveOnly: {
			desktopTablet: {
				'> .ugb-inner-block > .ugb-block-content > *': appendImportantAll( {
					paddingTop: getValue( 'columnPaddingTop', `%s${ columnPaddingUnit }` ),
					paddingBottom: getValue( 'columnPaddingBottom', `%s${ columnPaddingUnit }` ),
					paddingRight: getValue( 'columnPaddingRight', `%s${ columnPaddingUnit }` ),
					paddingLeft: getValue( 'columnPaddingLeft', `%s${ columnPaddingUnit }` ),
				} ),
			},
			tabletOnly: {
				'> .ugb-inner-block > .ugb-block-content > *': appendImportantAll( {
					paddingTop: getValue( 'tabletColumnPaddingTop', `%s${ tabletColumnPaddingUnit }` ),
					paddingRight: getValue( 'tabletColumnPaddingRight', `%s${ tabletColumnPaddingUnit }` ),
					paddingBottom: getValue( 'tabletColumnPaddingBottom', `%s${ tabletColumnPaddingUnit }` ),
					paddingLeft: getValue( 'tabletColumnPaddingLeft', `%s${ tabletColumnPaddingUnit }` ),
				} ),
			},
			mobile: {
				'> .ugb-inner-block > .ugb-block-content > *': appendImportantAll( {
					paddingTop: getValue( 'mobileColumnPaddingTop', `%s${ mobileColumnPaddingUnit }` ),
					paddingRight: getValue( 'mobileColumnPaddingRight', `%s${ mobileColumnPaddingUnit }` ),
					paddingBottom: getValue( 'mobileColumnPaddingBottom', `%s${ mobileColumnPaddingUnit }` ),
					paddingLeft: getValue( 'mobileColumnPaddingLeft', `%s${ mobileColumnPaddingUnit }` ),
				} ),
			},
		},
		editor: {
			desktopTablet: {
				'> .ugb-inner-block > .ugb-block-content > .ugb-number-box__item': appendImportantAll( {
					paddingTop: getValue( 'columnPaddingTop', `%s${ columnPaddingUnit }` ),
					paddingBottom: getValue( 'columnPaddingBottom', `%s${ columnPaddingUnit }` ),
					paddingRight: getValue( 'columnPaddingRight', `%s${ columnPaddingUnit }` ),
					paddingLeft: getValue( 'columnPaddingLeft', `%s${ columnPaddingUnit }` ),
				} ),
			},
			tabletOnly: {
				'> .ugb-inner-block > .ugb-block-content > .ugb-number-box__item': appendImportantAll( {
					paddingTop: getValue( 'tabletColumnPaddingTop', `%s${ tabletColumnPaddingUnit }` ),
					paddingRight: getValue( 'tabletColumnPaddingRight', `%s${ tabletColumnPaddingUnit }` ),
					paddingBottom: getValue( 'tabletColumnPaddingBottom', `%s${ tabletColumnPaddingUnit }` ),
					paddingLeft: getValue( 'tabletColumnPaddingLeft', `%s${ tabletColumnPaddingUnit }` ),
				} ),
			},
			mobile: {
				'> .ugb-inner-block > .ugb-block-content > .ugb-number-box__item': appendImportantAll( {
					paddingTop: getValue( 'mobileColumnPaddingTop', `%s${ mobileColumnPaddingUnit }` ),
					paddingRight: getValue( 'mobileColumnPaddingRight', `%s${ mobileColumnPaddingUnit }` ),
					paddingBottom: getValue( 'mobileColumnPaddingBottom', `%s${ mobileColumnPaddingUnit }` ),
					paddingLeft: getValue( 'mobileColumnPaddingLeft', `%s${ mobileColumnPaddingUnit }` ),
				} ),
			},
		},
	} )

	// Number
	const {
		contentAlign = '',
		tabletContentAlign = '',
		mobileContentAlign = '',
		numberBGColor = '',
		numberColor = '',
		numberAlign = '',
		numberTabletAlign = '',
		numberMobileAlign = '',
		numberLineHeight = '',
		numberTabletLineHeight = '',
		numberMobileLineHeight = '',
		numberLineHeightUnit = 'em',
		numberTabletLineHeightUnit = 'em',
		numberMobileLineHeightUnit = 'em',
		showNumber = true,
	} = props.attributes

	if ( showNumber ) {
		styles.push( {
			'.ugb-number-box__number': {
				...createTypographyStyles( 'number%s', 'desktop', props.attributes, { important: true } ),
				backgroundColor: show.numberBGColor ? appendImportant( getValue( 'numberBGColor' ) ) : undefined,
				color: appendImportant( whiteIfDarkBlackIfLight( numberColor, show.numberBGColor && numberBGColor ) ),
				opacity: getValue( 'numberOpacity' ),
				// Special case for centering the text with letter-spacing.
				textIndent: ( design === 'basic' || design === 'plain' ) ? getValue( 'numberLetterSpacing', '%spx' ) : undefined,
			},
			desktopTablet: {
				'.ugb-number-box__number': {
					height: show.numberBGColor ? appendImportant( getValue( 'numberPadding', '%sem' ) ) : undefined,
					width: show.numberBGColor ? appendImportant( getValue( 'numberPadding', '%sem' ) ) : undefined,
					lineHeight: appendImportant( show.numberBGColor && numberLineHeight === '' ? getValue( 'numberPadding', '%sem' ) : getValue( 'numberLineHeight', `%s${ numberLineHeightUnit }` ) ),
					marginLeft: numberAlign !== '' || contentAlign !== '' ? appendImportant( marginLeftAlign( numberAlign || contentAlign ) ) : undefined,
					marginRight: numberAlign !== '' || contentAlign !== '' ? appendImportant( marginRightAlign( numberAlign || contentAlign ) ) : undefined,
					textAlign: appendImportant( show.numberBGColor ? undefined : ( getValue( 'numberAlign' ) || getValue( 'contentAlign' ) ) ),
				},
			},
			tabletOnly: {
				'.ugb-number-box__number': {
					...createTypographyStyles( 'number%s', 'tablet', props.attributes, { important: true } ),
					lineHeight: appendImportant( show.numberBGColor && numberTabletLineHeight === '' ? getValue( 'numberTabletPadding', '%sem' ) : getValue( 'numberTabletLineHeight', `%s${ numberTabletLineHeightUnit }` ) ),
					marginLeft: numberTabletAlign !== '' || tabletContentAlign !== '' ? appendImportant( marginLeftAlign( numberTabletAlign ) ) : undefined,
					marginRight: numberTabletAlign !== '' || tabletContentAlign !== '' ? appendImportant( marginRightAlign( numberTabletAlign ) ) : undefined,
					textAlign: appendImportant( show.numberBGColor ? undefined : ( getValue( 'numberTabletAlign' ) || getValue( 'tabletContentAlign' ) ) ),
					height: show.numberBGColor ? appendImportant( getValue( 'numberTabletPadding', '%sem' ) ) : undefined,
					width: show.numberBGColor ? appendImportant( getValue( 'numberTabletPadding', '%sem' ) ) : undefined,
				},
			},
			mobile: {
				'.ugb-number-box__number': {
					...createTypographyStyles( 'number%s', 'mobile', props.attributes, { important: true } ),
					height: show.numberBGColor ? appendImportant( getValue( 'numberMobilePadding', '%sem' ) ) : undefined,
					width: show.numberBGColor ? appendImportant( getValue( 'numberMobilePadding', '%sem' ) ) : undefined,
					lineHeight: appendImportant( show.numberBGColor && numberMobileLineHeight === '' ? getValue( 'numberMobilePadding', '%sem' ) : getValue( 'numberMobileLineHeight', `%s${ numberMobileLineHeightUnit }` ) ),
					marginLeft: numberMobileAlign !== '' || mobileContentAlign !== '' ? appendImportant( marginLeftAlign( numberMobileAlign ) ) : undefined,
					marginRight: numberMobileAlign !== '' || mobileContentAlign !== '' ? appendImportant( marginRightAlign( numberMobileAlign ) ) : undefined,
					textAlign: appendImportant( show.numberBGColor ? undefined : ( getValue( 'numberMobileAlign' ) || getValue( 'mobileContentAlign' ) ) ),
				},
			},
		} )
	}

	const {
		titleColor = '',
		showTitle = true,
	} = props.attributes
	if ( showTitle ) {
		styles.push( {
			'.ugb-number-box__title': {
				...createTypographyStyles( 'title%s', 'desktop', props.attributes ),
				color: whiteIfDark( titleColor, show.columnBackground && columnBackgroundColor ),
				textAlign: getValue( 'titleAlign' ),
			},
			tablet: {
				'.ugb-number-box__title': {
					...createTypographyStyles( 'title%s', 'tablet', props.attributes ),
					textAlign: getValue( 'titleTabletAlign' ) || getValue( 'tabletContentAlign' ),
				},
			},
			mobile: {
				'.ugb-number-box__title': {
					...createTypographyStyles( 'title%s', 'mobile', props.attributes ),
					textAlign: getValue( 'titleMobileAlign' ) || getValue( 'mobileContentAlign' ),
				},
			},
		} )
	}

	const {
		descriptionColor = '',
		showDescription = true,
	} = props.attributes
	if ( showDescription ) {
		styles.push( {
			'.ugb-number-box__description': {
				...createTypographyStyles( 'description%s', 'desktop', props.attributes ),
				color: whiteIfDark( descriptionColor, show.columnBackground && columnBackgroundColor ),
				textAlign: getValue( 'descriptionAlign' ),
			},
			tablet: {
				'.ugb-number-box__description': {
					...createTypographyStyles( 'description%s', 'tablet', props.attributes ),
					textAlign: appendImportant( getValue( 'descriptionTabletAlign' ) || getValue( 'tabletContentAlign' ) ),
				},
			},
			mobile: {
				'.ugb-number-box__description': {
					...createTypographyStyles( 'description%s', 'mobile', props.attributes ),
					textAlign: appendImportant( getValue( 'descriptionMobileAlign' ) || getValue( 'mobileContentAlign' ) ),
				},
			},
		} )
	}

	// Number spacing.
	if ( show.numberSpacing ) {
		styles.push( ...createResponsiveStyles( '.ugb-number-box__number', 'number%sBottomMargin', 'marginBottom', '%spx', props.attributes, { important: true } ) )
	}
	if ( show.titleSpacing ) {
		styles.push( ...createResponsiveStyles( '.ugb-number-box__title', 'title%sBottomMargin', 'marginBottom', '%spx', props.attributes, { important: true } ) )
	}
	if ( show.descriptionSpacing ) {
		styles.push( ...createResponsiveStyles( '.ugb-number-box__description', 'description%sBottomMargin', 'marginBottom', '%spx', props.attributes, { important: true } ) )
	}

	return deepmerge.all( styles )
}

export default createStyles
