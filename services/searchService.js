import fetch from "node-fetch";
import env from "dotenv";
env.config();

export const searchService = async (domain) => {
  const response = await fetch(
    `https://urlscan.io/api/v1/search/?q=domain:${domain}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "API-Key": process.env.API_KEY,
      },
    }
  );
  const jsonResponse = await response.json();
  return jsonResponse;
};
