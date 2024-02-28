const router = require("express").Router();
const CodeModel = require("../models/code");
const { User } = require("../models/user");
const { validate } = require("../validations/validation")
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { v4 } = require("uuid")

const secretKey = "wkjhfiwehfuiheubcquiuiweucwbcb@#$$@@#"

// router.post("/", async (req, res) => {
// 	try {
// 		const { error } = validate(req.body);
// 		if (error)
// 			return res.status(400).send({ message: error.details[0].message });

// 		const user = await User.findOne({ email: req.body.email });
// 		if (user)
// 			return res
// 				.status(409)
// 				.send({ message: "User with given email already Exist!" });

// 		const salt = await bcrypt.genSalt(Number(process.env.SALT));
// 		const hashPassword = await bcrypt.hash(req.body.password, salt);

// 		await new User({ ...req.body, password: hashPassword }).save();
// 		res.status(201).send({ message: "User created successfully" });
// 	} catch (error) {
// 		res.status(500).send({ message: "Internal Server Error" });
// 	}
// });

router.post("/", async (req, res) => {
	try {
		const token = req.headers.authorization
		if (!token) {
			return res
				.status(401)
				.send({ message: "Unauthorized" });
		}
		const decoded = jwt.verify(token, secretKey, function (err, res) {
			if (err) {
				console.log(err, 'lll')
			}
		});
		if (!decoded) {
			return res
				.status(403)
				.send({ message: "Forbidden" });
		}
		req.user = decoded;
		const users = await User.find({}, { password: 0 });
		res.status(201).send({ users: users });
	} catch (error) {
		console.log(error, 'error')
		res.status(500).send({ message: "Internal Server Error" });
	}
});

router.post("/create/version", async (req, res) => {
	try {
		const token = req.headers.authorization
		const {newCode,roomId,message} = req.body
		if (!token) {
			return res
				.status(401)
				.send({ message: "Unauthorized" });
		}
		const decoded = jwt.verify(token, secretKey);
		console.log(decoded,'token')
		if (!decoded) {
			return res
				.status(403)
				.send({ message: "Forbidden" });
		}
		req.user = decoded;
		await CodeModel.create({
			content: newCode,
			roomId: roomId,
			version: v4(),
			message: message
		});
		res.status(201).send({ message : "Committed successfully"});
	} catch (error) {
		console.log(error, 'error')
		res.status(500).send({ message: "Internal Server Error" });
	}
});

router.get("/version/list", async (req, res) => {
	try {
		const token = req.headers.authorization
		if (!token) {
			return res
				.status(401)
				.send({ message: "Unauthorized" });
		}
		const decoded = jwt.verify(token, secretKey);
		if (!decoded) {
			return res
				.status(403)
				.send({ message: "Forbidden" });
		}
		// req.user = decoded;
		const data = CodeModel.find()
		res.status(201).send({ history : data});
	} catch (error) {
		console.log(error, 'error')
		res.status(500).send({ message: "Internal Server Error" });
	}
});

module.exports = router;
