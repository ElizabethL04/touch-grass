import axios from "axios";

export default async function handler(req, res) {
  if (req.method !== "GET") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { lat, lng, radius } = req.query;

  if (!lat || !lng) {
    return res.status(400).json({ error: "Missing lat or lng query parameter" });
  }

  const GOOGLE_API_KEY = process.env.GOOGLE_API_KEY;
  if (!GOOGLE_API_KEY) {
    return res.status(500).json({ error: "Google API key not configured on server" });
  }

  // Default radius 500 meters
  const searchRadius = radius ? parseInt(radius) : 500;

  const url = `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${lat},${lng}&radius=${searchRadius}&type=park&key=${GOOGLE_API_KEY}`;

  try {
    const { data } = await axios.get(url);

    if (!data.results) {
      console.error("Google API error:", data);
      return res.status(500).json({ error: "Failed to fetch nearby parks" });
    }

    const parks = data.results.slice(0, 10).map((place) => ({
      place_id: place.place_id,
      name: place.name,
      vicinity: place.vicinity,
      geometry: place.geometry,
    }));

    return res.status(200).json(parks);
  } catch (err) {
    console.error("Server error fetching parks:", err.message);
    return res.status(500).json({ error: "Internal server error" });
  }
}
