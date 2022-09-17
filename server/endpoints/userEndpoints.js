const router = require("express").Router();

const { getUsers, getUser, toggleBookmark } = require("../handlers/userHandlers");

router.get(`/api/users`, (req, res) => getUsers(req, res));

router.get(`/api/user/:email`, (req, res) => getUser(req, res));

router.put(`/api/user/bookmark`, (req, res) => toggleBookmark(req, res));

module.exports = router;
