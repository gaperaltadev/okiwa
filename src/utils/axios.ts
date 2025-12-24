import axios from "axios";

// Create a base Axios instance
const instance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BASE_PATH || "",
  headers: {
    "Content-Type": "application/json",
  },
});

// Helper to set the Authorization header dynamically
export const setAuthToken = (token: string | null) => {
  if (token) {
    instance.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  } else {
    delete instance.defaults.headers.common["Authorization"];
  }
};

export default instance;
