import { apiRequest, clearTokens, getRefreshToken, saveTokens } from "./client";
import { endpoints } from "./endpoints";

export async function login({ loginId, password }) {
  const data = await apiRequest(endpoints.auth.login, {
    method: "POST",
    auth: false,
    body: { loginId, password },
  });

  saveTokens(data);
  return data;
}

export function signup({ loginId, password, nickname, studentNumber, department }) {
  return apiRequest(endpoints.auth.signup, {
    method: "POST",
    auth: false,
    body: { loginId, password, nickname, studentNumber, department },
  });
}

export async function reissue() {
  const data = await apiRequest(endpoints.auth.reissue, {
    method: "POST",
    auth: false,
    body: { refreshToken: getRefreshToken() },
  });

  saveTokens(data);
  return data;
}

export async function logout() {
  const data = await apiRequest(endpoints.auth.logout, {
    method: "POST",
    body: { refreshToken: getRefreshToken() },
  });

  clearTokens();
  return data;
}
