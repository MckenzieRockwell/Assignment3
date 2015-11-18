
var mongoose = require('mongoose'), Schema = mongoose.Schema

var userSchema = new Schema({
	username: String,
	password: String,
	email: String,
}); 


// Checking if password is valid
userSchema.methods.validPassword = function (password) {
	if (password == this.password){
		return true;
	}
}

module.exports = mongoose.model('user', userSchema);

