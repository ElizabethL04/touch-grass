// api/nearby.js
import axios from "axios";

export default async function handler(req, res) {
  const { lat, lng } = req.query;

  if (!lat || !lng) {
    return res.status(400).json({ error: "Missing lat or lng" });
  }

  const GOOGLE_API_KEY = process.env.GOOGLE_API_KEY; // Set in Vercel env vars

  const url = `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${lat},${lng}&radius=3000&type=park&keyword=grass&key=${GOOGLE_API_KEY}`;

  try {
    const response = await axios.get(url);
    // Return top 5 results
    res.status(200).json(response.data.results.slice(0, 5));
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch places" });
  }
}
