import { NavItem } from "@/types";
import axios from "axios";

export const BaseApi = axios.create({
  baseURL: `${process.env.NEXT_PUBLIC_API_BASE_URL}/`,
  headers: {
    "Content-Type": "application/json",
    "access-control-allow-origin": "*",
  },
});

BaseApi.interceptors.request.use(
  (config) => {
    // config.headers["access-control-allow-origin"] = "*";
    return config;
  },
  (error) => {
    // Handle request errors (e.g., network issues before request is sent)
    return Promise.reject(error);
  }
);

export const fetchNav = async (): Promise<NavItem[]> => {
  const response = await BaseApi.get<NavItem[]>(`nav`);
  return response.data;
};

export const saveNav = async (navData: NavItem[]): Promise<void> => {
  await BaseApi.post(`nav`, navData);
};

export const trackReorder = async (
  id: number,
  from: number,
  to: number
): Promise<void> => {
  await BaseApi.post(`track`, { id, from, to });
};
