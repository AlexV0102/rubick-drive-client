import { getItemLocalStorage } from "./localStorage";

const isTokenExpired = (token: string) => {
  const payload = JSON.parse(atob(token.split(".")[1]));
  return payload.exp * 1000 < Date.now();
};

const refreshIfNeeded = () => {
  const token = getItemLocalStorage("accessToken");
  console.log("token", token);
  if (token && isTokenExpired(token)) {
  }
};

export default refreshIfNeeded;
