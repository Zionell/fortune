import axios from "axios";

const base_url =
  process.env.NODE_ENV === "development"
    ? "http://localhost:5000"
    : "https://fortune-for-sales.herokuapp.com";

export const axiosDefault = axios.create({
  baseURL: base_url,
});
