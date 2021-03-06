import { marginBottomAttributes } from '~stackable/helpers'

export default {
	uniqueId: {
		type: 'string',
		source: 'attribute',
		selector: '[data-id]',
		attribute: 'data-id',
		default: '',
	},
	design: {
		type: 'string',
		default: '',
	},
	...marginBottomAttributes,
	hasBackground: {
		type: 'boolean',
		default: false,
	},
}
