const baseURL = process.env.NEXT_PUBLIC_API_URL + "/api";

import axios from "axios";

export const nextServerApi = axios.create({
  baseURL,
  withCredentials: true,
});

export interface SessionResponse {
  success: boolean;
}
