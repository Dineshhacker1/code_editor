const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");

const JWTPRIVATEKEY = "wkjhfiwehfuiheubcquiuiweucwbcb@#$$@@#"


const userSchema = new mongoose.Schema({
	userName: { type: String, required: true },
	email: { type: String, required: true },
	password: { type: String, required: true },
});

userSchema.methods.generateAuthToken = async ()=> {
	console.log('this userid ', this._id)
	const token = await jwt.sign({ _id: this._id }, ""+ JWTPRIVATEKEY, {
		expiresIn: "1d",
	});
	console.log(token)
	return token;
};

const User = mongoose.model("user", userSchema);

// const validate = (data) => {
// 	const schema = Joi.object({
// 		firstName: Joi.string().required().label("First Name"),
// 		lastName: Joi.string().required().label("Last Name"),
// 		email: Joi.string().email().required().label("Email"),
// 		password: passwordComplexity().required().label("Password"),
// 	});
// 	return schema.validate(data);
// };

module.exports = { User };
