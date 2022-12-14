"use strict";

const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const path = require("path");

const PORT = 9000;

express()
	.use(function (req, res, next) {
		res.header("Access-Control-Allow-Methods", "OPTIONS, HEAD, GET, PUT, POST, DELETE");
		res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
		next();
	})
	.use(morgan("tiny"))
	.use(express.static("./server/assets"))
	.use(express.json())
	.use(express.urlencoded({ extended: false }))
	.use("/", express.static(__dirname + "/"))

	.use(require("./endpoints/userEndpoints"))

	.listen(PORT, () => console.log(`Listening on port ${PORT}`));
