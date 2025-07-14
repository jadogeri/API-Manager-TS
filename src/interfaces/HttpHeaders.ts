interface HttpHeaders {
  [key: string]: string | string[] | undefined;
}

const headers: HttpHeaders = {
  "Content-Type": "application/json",
  "Authorization": "Bearer your_token",
  "Accept-Language": ["en-US", "en"], // Example with string array value
  "X-Rate-Limit": undefined, // Example with undefined value
};

// You might pass this object to a library or function:
// someHttpClient.post("/data", { headers });