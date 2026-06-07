import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:8080/api/github"
});

export const getGithubProfile = async (username) => {
  const response = await API.get(`/${username}`);
  return response.data;
};
