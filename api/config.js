// api/config.js
// Vercel Serverless Function to dynamically serve SDK credentials from environment variables.
// This prevents committing sensitive keys directly to public repositories.

export default function handler(request, response) {
  // Respond with the Vercel environment variables or fallback placeholders
  response.status(200).json({
    apiKey: process.env.GROWBOLT_API_KEY || "",
    sub4: process.env.GROWBOLT_SUB4 || ""
  });
}
