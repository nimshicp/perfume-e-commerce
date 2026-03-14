import api from "./axios";

export const registerUser = (data) => {
  return api.post("users/register/", data);
};

export const loginUser = (data) => {
  return api.post("users/login/", data);
};

export const getProfile = () => {
  return api.get("users/me/");
};

export const googleLogin = (token) => {
  return api.post("users/google-login/", {
    token: token,
  });
};