const router = require("express").Router();
const { User } = require("../models/user");
const bcrypt = require("bcrypt");
const { emailValidate } = require("../validations/validation");
const jwt = require("jsonwebtoken");


const SALT = "8"
const JWTPRIVATEKEY = "wkjhfiwehfuiheubcquiuiweucwbcb@#$$@@#"

function generateAuthToken(userObj) {
	const token = jwt.sign({ email: userObj.email, password: userObj.password }, JWTPRIVATEKEY, {
		expiresIn: "1d",
	});
	return token;
}

router.post("/signup", async (req, res) => {
	try {
		const user = await User.findOne({ email: req.body.email });
		if (user)
			return res
				.status(409)
				.send({ message: "User with given email already Exist!" });

		const salt = await bcrypt.genSalt(Number(SALT));
		const hashPassword = await bcrypt.hash(req.body.password, salt);

		await new User({ ...req.body, password: hashPassword }).save();
		res.status(201).send({ message: "User created successfully" });
	} catch (error) {
		console.log(error)
		res.status(500).send({ message: "Internal Server Error" });
	}
});

router.post("/login", async (req, res) => {
	try {
		const user = await User.findOne({ email: req.body.email });
		if (!user)
			return res.status(401).send({ message: "Invalid Email" });

		const validPassword = await bcrypt.compare(
			req.body.password,
			user.password
		);
		if (!validPassword)
			return res.status(401).send({ message: "Invalid Email or Password" });

		const token = generateAuthToken(user);
		res.status(200).send({ data: token, message: "logged in successfully" });
	} catch (error) {
		console.log(error, 'error')
		res.status(500).send({ message: "Internal Server Error" });
	}
});

module.exports = router;
