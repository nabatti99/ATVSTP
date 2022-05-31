import * as Updates from "expo-updates";
import axios, { AxiosInstance } from "axios";

const instance: AxiosInstance = axios.create({
  baseURL: Updates.releaseChannel ? "https://atvstp-api.herokuapp.com" : "http://127.0.0.1:5000/",
  timeout: 10000,
  headers: {
    "access-token":
      "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJfaWQiOiI2MjNmMWRmYTQ3N2VkZTk3MzE2ODhhYWIifQ.W2RgM_IdqbtIij-LK1BfZMZ56vyBIeJkSgfnfvv2eNw",
  },
});

instance.interceptors.request.use(
  function (config) {
    console.log(`URL: ${config.baseURL}/${config.url} (${config.method})`);
    console.log(`Params: ${JSON.stringify(config.params)}`);
    return config;
  },
  function (error) {
    console.error(error);
  }
);

instance.interceptors.response.use(
  function (config) {
    console.log(`Status: ${config.status}`);
    console.log(`Status text: ${config.statusText}`);
    return config;
  },
  function (error) {
    console.error(error);
  }
);

export default function useRequest() {
  return instance;
}
