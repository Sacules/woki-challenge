import axios from "axios";

const API_KEY = process.env.API_KEY;

export const router = axios.create({
  baseURL: "https://api.themoviedb.org/3",
  headers: {
    Accept: "application/json",
    Authorization: `Bearer ${API_KEY}`,
  },
});
