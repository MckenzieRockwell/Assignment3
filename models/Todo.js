var mongoose = require('mongoose'), Schema = mongoose.Schema; 

var todoSchema = new Schema({
	name: {
		type: String,
		default: ''
	},

	createdAt: {
		type: Date,
		default: Date.now
	},

	notes: {
		type: String,
		defautl: ''
	},

	completed: {
		type: Boolean,
		default: false
	},

	completedAt:{
		type: Date,
		default: ''
	},

	editMode: {
		type: Boolean,
		default: false
	}
});

module.exports = mongoose.model('todo', todoSchema); 