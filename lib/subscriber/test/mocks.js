var exports = module.exports = {};

exports.pluginOptions = {
	token: {
		secret: 's3€r34',
		algorithms: [ 'HS256' ]
	},
	topics: [{
		code: 'DEF:TOC',
		required: true,
		info: 'Site Terms and Conditions'
	}]
};

exports.subscriber = {
	_id: '123qwe123asd123zxc123',
	topics: []
};