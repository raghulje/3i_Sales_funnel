import { getApiBase } from "./baseUrl.js";

const TOKEN_KEY = "3i_token";

export function token() {
  return localStorage.getItem(TOKEN_KEY);
}

export function setToken(t) {
  if (t) localStorage.setItem(TOKEN_KEY, t);
  else localStorage.removeItem(TOKEN_KEY);
}

export async function request(path, options = {}) {
  const headers = {
    Accept: "application/json",
    ...(options.headers || {}),
  };
  const t = token();
  if (t) headers.Authorization = `Bearer ${t}`;
  if (options.json !== undefined) {
    headers["Content-Type"] = "application/json";
  }

  const res = await fetch(`${getApiBase()}${path}`, {
    ...options,
    headers,
    body: options.json !== undefined ? JSON.stringify(options.json) : options.body,
  });

  const data = await res.json().catch(() => ({}));
  if (!res.ok) {
    const msg = Array.isArray(data.messages)
      ? data.messages.join(", ")
      : data.messages || data.message || data.error || res.statusText;
    throw new Error(String(msg));
  }
  return data;
}

export const authApi = {
  login: (email, password) =>
    request("/login", { method: "POST", json: { email, password } }),
  me: () => request("/user"),
  logout: () => request("/logout", { method: "POST" }).catch(() => undefined),
  forgotPassword: (email) =>
    request("/password/forgot", { method: "POST", json: { email } }),
  validateResetToken: (tok) => request(`/password/reset/${encodeURIComponent(tok)}`),
  resetPassword: (tok, password, password_confirmation) =>
    request("/password/reset", {
      method: "POST",
      json: { token: tok, password, password_confirmation },
    }),
};

export const api = {
  meta: () => request("/meta"),
  opportunities: (q = "") => request("/opportunities" + q),
  opportunity: (id) => request("/opportunities/" + encodeURIComponent(id)),
  create: (body) => request("/opportunities", { method: "POST", json: body }),
  patch: (id, body) =>
    request("/opportunities/" + encodeURIComponent(id), { method: "PATCH", json: body }),
  stage: (id, processStage) =>
    request("/opportunities/" + encodeURIComponent(id) + "/stage", {
      method: "POST",
      json: { processStage },
    }),
  remark: (id, text) =>
    request("/opportunities/" + encodeURIComponent(id) + "/remarks", {
      method: "POST",
      json: { text },
    }),
  dashboard: (q = "") => request("/dashboard" + q),
  funnel: (q = "") => request("/funnel" + q),
  forecast: (q = "") => request("/forecast" + q),
  lost: (q = "") => request("/lost" + q),
  quality: () => request("/quality"),
  reset: () => request("/reset", { method: "POST" }),
  users: () => request("/users"),
  createUser: (body) => request("/users", { method: "POST", json: body }),
  patchUser: (id, body) => request(`/users/${id}`, { method: "PATCH", json: body }),
  deleteUser: (id) => request(`/users/${id}`, { method: "DELETE" }),
  profile: () => request("/account/profile"),
  saveProfile: (body) => request("/account/profile", { method: "PATCH", json: body }),
  changePassword: (body) => request("/account/password", { method: "POST", json: body }),
};

export function formatINR(lakhs) {
  if (lakhs == null || Number(lakhs) === 0 || isNaN(Number(lakhs))) return "—";
  const n = Number(lakhs);
  if (n >= 100) {
    const cr = n / 100;
    const text = cr >= 10 ? cr.toFixed(1).replace(/\.0$/, "") : cr.toFixed(2).replace(/0$/, "").replace(/\.0$/, "");
    return "₹" + text + " Cr";
  }
  return "₹" + (n % 1 === 0 ? n : n.toFixed(1)) + " L";
}

export function qs(obj) {
  const p = new URLSearchParams();
  Object.entries(obj || {}).forEach(([k, v]) => {
    if (v && v !== "all") p.set(k, v);
  });
  const s = p.toString();
  return s ? "?" + s : "";
}
