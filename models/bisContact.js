var mongoose = require('mongoose'), Schema = mongoose.Schema

var contactSchema = new Schema({

	name :{
		type: String,
		default: ''
	}, 

	number: {
		type: String,
		default: ''
	},

	emailaddress : {
		type: String,
		default: ''
	}
});

module.exports = mongoose.model('bisContact', contactSchema);