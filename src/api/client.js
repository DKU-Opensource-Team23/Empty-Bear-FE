import { endpoints } from "./endpoints";

const DEFAULT_API_BASE_URL = "";

export const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL ?? DEFAULT_API_BASE_URL;

const ACCESS_TOKEN_KEY = "accessToken";
const REFRESH_TOKEN_KEY = "refreshToken";

export function getAccessToken() {
  return localStorage.getItem(ACCESS_TOKEN_KEY);
}

export function getRefreshToken() {
  return localStorage.getItem(REFRESH_TOKEN_KEY);
}

export function saveTokens({ accessToken, refreshToken }) {
  if (accessToken) {
    localStorage.setItem(ACCESS_TOKEN_KEY, accessToken);
  }

  if (refreshToken) {
    localStorage.setItem(REFRESH_TOKEN_KEY, refreshToken);
  }
}

export function clearTokens() {
  localStorage.removeItem(ACCESS_TOKEN_KEY);
  localStorage.removeItem(REFRESH_TOKEN_KEY);
}

async function requestNewAccessToken() {
  const refreshToken = getRefreshToken();

  if (!refreshToken) {
    return null;
  }

  const response = await fetch(buildUrl(endpoints.auth.reissue), {
    method: "POST",
    body: JSON.stringify({ refreshToken }),
    headers: {
      "Content-Type": "application/json",
    },
  });

  const data = await parseResponse(response);

  if (!response.ok) {
    clearTokens();
    return null;
  }

  saveTokens(data);
  return data.accessToken ?? null;
}

function buildUrl(path, query) {
  const baseUrl = API_BASE_URL || window.location.origin;
  const url = new URL(path, baseUrl);

  if (query) {
    Object.entries(query).forEach(([key, value]) => {
      if (value !== undefined && value !== null && value !== "") {
        url.searchParams.set(key, value);
      }
    });
  }

  return url.toString();
}

async function parseResponse(response) {
  const contentType = response.headers.get("content-type");

  if (response.status === 204) {
    return null;
  }

  if (contentType?.includes("application/json")) {
    return response.json();
  }

  return response.text();
}

export async function apiRequest(path, options = {}) {
  const { query, body, headers, auth = true, ...fetchOptions } = options;
  const token = getAccessToken();
  const hasBody = body !== undefined;

  const requestUrl = buildUrl(path, query);
  const requestOptions = {
    ...fetchOptions,
    body: hasBody ? JSON.stringify(body) : undefined,
    headers: {
      ...(hasBody ? { "Content-Type": "application/json" } : {}),
      ...(auth && token ? { Authorization: `Bearer ${token}` } : {}),
      ...headers,
    },
  };

  let response = await fetch(requestUrl, requestOptions);

  if (auth && response.status === 401) {
    const newAccessToken = await requestNewAccessToken();

    if (newAccessToken) {
      response = await fetch(requestUrl, {
        ...requestOptions,
        headers: {
          ...requestOptions.headers,
          Authorization: `Bearer ${newAccessToken}`,
        },
      });
    }
  }

  const data = await parseResponse(response);

  if (!response.ok) {
    const message =
      typeof data === "object" && data !== null
        ? data.message ??
          data.error ??
          data.detail ??
          data.reason ??
          JSON.stringify(data)
        : "API request failed.";

    throw new Error(message);
  }

  return data;
}
