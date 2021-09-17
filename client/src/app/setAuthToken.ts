import createAxiosInstance from "./api";

const setAuthToken = (token?: string) => {
  if (token) {
    createAxiosInstance().defaults.headers.common["Authorization"] = token;
    localStorage.setItem("token", token);
  } else {
    delete createAxiosInstance().defaults.headers.common["Authorization"];
    localStorage.removeItem("token");
  }
};
export default setAuthToken;
