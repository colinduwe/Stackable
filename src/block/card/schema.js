import {
	createImageBackgroundAttributes,
} from '~stackable/util'

export default {
	uniqueId: {
		type: 'string',
		source: 'attribute',
		selector: '[data-id]',
		attribute: 'data-id',
		default: '',
	},
	isFirstBlock: {
		type: 'boolean',
		default: false,
	},
	isLastBlock: {
		type: 'boolean',
		default: false,
	},
	design: {
		type: 'string',
		default: '',
	},
	columnWidth: {
		type: 'number',
		default: '',
	},
	columnWidthTablet: {
		type: 'number',
		default: '',
	},
	columnWidthMobile: {
		type: 'number',
		default: '',
	},
	hasContainer: {
		type: 'boolean',
		default: true,
	},
	hasBackground: {
		type: 'boolean',
		default: false,
	},
	...createImageBackgroundAttributes( 'image%s' ),
	imageHeight: {
		type: 'number',
		default: '',
	},
	imageWidth: {
		type: 'number',
		default: '',
	},
	imageHeightUnit: {
		type: 'string',
		default: 'px',
	},
	imageWidthUnit: {
		type: 'string',
		default: '%',
	},
}
