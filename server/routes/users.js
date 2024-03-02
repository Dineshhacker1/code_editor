const router = require("express").Router();
const Chat = require("../models/chat");
const CodeModel = require("../models/code");
const { User } = require("../models/user");
const { validate } = require("../validations/validation")
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { v4 } = require("uuid")

const secretKey = "wkjhfiwehfuiheubcquiuiweucwbcb@#$$@@#"

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
		const { newCode, roomId, message } = req.body
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
		req.user = decoded;
		await CodeModel.create({
			content: newCode,
			roomId: roomId,
			version: v4(),
			message: message
		});
		res.status(201).send({ message: "Committed successfully" });
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
		const data = await CodeModel.find()
		res.status(201).send({ history: data });
	} catch (error) {
		console.log(error, 'error')
		res.status(500).send({ message: "Internal Server Error" });
	}
});
router.get("/chat/list", async (req, res) => {
	try {
		const token = req.headers.authorization
		const roomId = req.query
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
		const data = await Chat.find()
		res.status(201).send({ chatData: data });
	} catch (error) {
		console.log(error, 'error')
		res.status(500).send({ message: "Internal Server Error" });
	}
});

module.exports = router;
