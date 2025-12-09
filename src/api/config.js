// Central place to set your API base URL.
// Priority:
// 1) Vite env: VITE_API_BASE_URL (set in `.env` / deployment env vars)
// 2) Dev fallback: http://localhost:5000/api (backend running locally)
// 3) Prod fallback: same origin as the served site (assumes backend + frontend on one host)
//
// For emulators/real devices, override with VITE_API_BASE_URL,
//   e.g. VITE_API_BASE_URL=http://10.0.2.2:5000/api

const isDev = typeof import.meta !== "undefined" ? import.meta.env.DEV : false;
const envBase =
  typeof import.meta !== "undefined"
    ? import.meta.env?.VITE_API_BASE_URL
    : undefined;

const sameOriginBase =
  typeof window !== "undefined"
    ? `${window.location.origin}/api`
    : "http://localhost:5000/api";

export const BASE_URL =
  envBase || (isDev ? "http://localhost:5000/api" : "https://sihbackend-ihbz.onrender.com/api");
