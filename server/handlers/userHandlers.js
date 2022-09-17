"use strict";

require("dotenv").config();
const { MONGO_URI } = process.env;
const { MongoClient } = require("mongodb");
const options = {
	useNewUrlParser: true,
	useUnifiedTopology: true,
};

const sendResponse = (res, status, data, message = "No message included.") => {
	return res.status(status).json({ status, data, message });
};

const getUsers = async (req, res) => {
	const client = new MongoClient(MONGO_URI, options);

	try {
		await client.connect();
		const db = client.db("MovieDB");

		const users = await db.collection("users").find().toArray();

		users ? sendResponse(res, 200, users, "Success") : sendResponse(res, 404, null, "Unsuccessful");
	} catch (error) {
		sendResponse(res, 404, null, "Server Error");
	}
	client.close();
};

const getUser = async (req, res) => {
	console.log("gdfijsgkfsjkgf")
	const client = new MongoClient(MONGO_URI, options);

	try {
		await client.connect();
		const db = client.db("MovieDB");
		const email = req.params.email;
		console.log("EMail", email)

		const user = await db.collection("users").findOne({ email: email });
console.log("hfeihfihsifh", user)
		user ? sendResponse(res, 200, user, "Success") : sendResponse(res, 404, null, "Unsuccessful");
	} catch (error) {
		console.error(error)
		sendResponse(res, 404, null, "Server Error");
	}
	client.close();
};

const toggleBookmark = async (req, res) => {
	const client = new MongoClient(MONGO_URI, options);
	try {
		await client.connect();
		const db = client.db("MovieDB");

		const email = req.body.email;
		const user = await db.collection("users").findOne({ email: email });

		const bookmarks = [];

		if (user.bookmarks.length === 0) {
			bookmarks.push(req.body.data);
		} else {
			let exist = false;
			for (const movie of user.bookmarks) {
				movie.id === req.body.data.id ? (exist = true) : bookmarks.push(movie);
			}
			if (!exist) {
				bookmarks.push(req.body.data);
			}
		}

		const updated = await db.collection("users").findOneAndUpdate({ email: email }, { $set: { bookmarks: bookmarks } });
		updated ? sendResponse(res, 200, updated, "Success") : sendResponse(res, 404, null, "Unsuccessful");
	} catch (error) {
		sendResponse(res, 404, null, "Server Error");
	}
	client.close();
};

module.exports = {
	getUsers,
	getUser,
	toggleBookmark,
};
