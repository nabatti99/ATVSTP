import { useEffect, useRef, useState } from "react";
import axios from "axios";

function createRequest(accessToken) {
  return axios.create({
    baseURL: process.env.NODE_ENV == "development" ? "http://127.0.0.1:5000/" : "https://atvstp-api.herokuapp.com",
    timeout: 10000,
    headers: {
      "access-token": accessToken,
    },
  });
}

function useRequest() {
  const [accessToken, setAccessToken] = useState("");
  const request = useRef(createRequest(localStorage.getItem("access-token")));

  useEffect(() => {
    const currentAccessToken = localStorage.getItem("access-token");
    if (currentAccessToken !== accessToken) {
      request.current = createRequest(currentAccessToken);
      setAccessToken(currentAccessToken);
    }
  });

  return request.current;
}

export default useRequest;
