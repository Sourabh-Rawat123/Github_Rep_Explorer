const express = require("express");
const router = express.Router();
const {getGithubProfile}=require("../controllers/github_controller.js")
router.get("/:username",getGithubProfile)
module.exports=router;