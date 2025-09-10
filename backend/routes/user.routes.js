const express = require("express");
const protectRoute = require("../middleware/protectRoute.js");
const { getUsersForSidebar } = require("../controllers/user.controller.js");

const router = express.Router();

// This route will be protected, meaning you must be logged in to see other users
router.get("/", protectRoute, getUsersForSidebar);

module.exports = router;