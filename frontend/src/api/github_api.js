import axios from "axios";

const API = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

export const getGithubProfile = async (username) => {
  const response = await API.get(`/${username}`);
  return response.data;
};
