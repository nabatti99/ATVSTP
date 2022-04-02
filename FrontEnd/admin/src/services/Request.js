import axios from "axios";

function Request() {
  this.instance = null;
}

Request.prototype.createInstance = function () {
  this.instance = axios.create({
    baseURL: "http://127.0.0.1:5000/",
    timeout: 10000,
    headers: {
      "access-token": localStorage.getItem("access-token"),
    },
  });
};

Request.prototype.getInstance = function () {
  if (!this.instance) this.createInstance();

  return this.instance;
};

export default Request;
