const Mongoose = require('mongoose');
const subscriberSchema = new Mongoose.Schema({
	topics: [String]
}, {
	toObject: {
		transform: function (doc, ret) {
			delete ret.__v;
		}
	}
});

module.exports = Mongoose.model('User', subscriberSchema);