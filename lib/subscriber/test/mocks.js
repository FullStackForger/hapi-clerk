var exports = module.exports = {};

exports.pluginOptions = {
	auth: {
		token: {
			secret: process.env.TOKEN_SECRET || 'secret_token',
			algorithms: [ 'HS256' ]
		}
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