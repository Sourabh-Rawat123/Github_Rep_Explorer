const axios = require("axios");
const CacheService = require("./cache_service");

async function Get_Userdata(username) {
  if (!username || username === ":username") {
    throw new Error("Provide a valid GitHub username.");
  }

  const cache_data = CacheService.get(username);

  if (cache_data) {
    console.log("Cache Hit");
    return cache_data;
  }

  const [userResponse, reposResponse] = await Promise.all([
    axios.get(`https://api.github.com/users/${username}`, {
      headers: {
        Authorization: `Bearer ${process.env.Github_Token}`,
        Accept: "application/vnd.github+json",
        "X-GitHub-Api-Version": "2022-11-28",
        "User-Agent": "Github_rep_explorer",
      },
    }),
    axios.get(`https://api.github.com/users/${username}/repos?per_page=100`, {
      headers: {
        Authorization: `Bearer ${process.env.Github_Token}`,
        Accept: "application/vnd.github+json",
        "X-GitHub-Api-Version": "2022-11-28",
        "User-Agent": "Github_rep_explorer",
      },
    }),
  ]);

  const user = userResponse.data;
  const repos = reposResponse.data.map((repo) => ({
    id: repo.id,
    name: repo.name,
    description: repo.description,
    language: repo.language,
    stars: repo.stargazers_count,
    updatedAt: repo.updated_at,
    openIssues: repo.open_issues_count,
    defaultBranch: repo.default_branch,
    htmlUrl: repo.html_url,
  }));

  const responseData = {
    user: {
      login: user.login,
      avatar: user.avatar_url,
      name: user.name,
      bio: user.bio,
      followers: user.followers,
      following: user.following,
      publicRepos: user.public_repos,
    },
    repos,
  };

  CacheService.set(username, responseData);
  return responseData;
}

module.exports = {
  Get_Userdata,
};