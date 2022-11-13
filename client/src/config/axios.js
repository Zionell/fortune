import axios from "axios";

const base_url =
  process.env.NODE_ENV === "development"
    ? "http://localhost:5000"
    : "http://a0548906.xsph.ru/";

export const axiosDefault = axios.create({
  baseURL: base_url,
});
