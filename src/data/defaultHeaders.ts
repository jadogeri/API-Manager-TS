import { HttpHeaders } from "../interfaces/HttpHeaders";

export const defaultHeaders: HttpHeaders = {
  "Content-Type": "application/json",
  "Authorization": "Bearer your_token",
  "Accept-Language": ["en-US", "en"], // Example with string array value
};
