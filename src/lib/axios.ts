import axios from "axios";

export const api = axios.create({
   baseURL: "https://my-json-server.typicode.com/joanacardosox/ControlFinance/",
  headers: {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS",
  },
});
