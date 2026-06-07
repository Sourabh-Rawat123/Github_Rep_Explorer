const Async_handler = require("../utils/Async_Handler.js");
const { Get_Userdata } = require("../services/github_service.js");

const getGithubProfile = Async_handler(async (req, res) => {
  const { username } = req.params;

  if (!username || username === ":username") {
    return res.status(400).json({
      message: "Provide a valid GitHub username.",
    });
  }

  const user = await Get_Userdata(username);

  return res.status(200).json(user);
});

module.exports = { getGithubProfile };