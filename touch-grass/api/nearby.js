import axios from "axios";

export default async function handler(req, res) {
  const { lat, lng } = req.query;

  if (!lat || !lng) {
    return res.status(400).json({ error: "Missing lat or lng query parameter" });
  }

  const GOOGLE_API_KEY = process.env.GOOGLE_API_KEY;
  if (!GOOGLE_API_KEY) {
    return res.status(500).json({ error: "Google API key not configured" });
  }

  // Use a larger radius and remove keyword to avoid ZERO_RESULTS
  const url = `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${lat},${lng}&radius=5000&type=park&key=${GOOGLE_API_KEY}`;

  try {
    const response = await axios.get(url);
    const results = response.data.results || [];

    // Return top 5 spots (or empty array if none)
    const top5 = results.slice(0, 5).map(place => ({
      place_id: place.place_id,
      name: place.name,
      vicinity: place.vicinity,
      geometry: {
        location: {
          lat: place.geometry.location.lat,
          lng: place.geometry.location.lng,
        }
      }
    }));

    res.status(200).json(top5);
  } catch (err) {
    console.error(err.response?.data || err.message);
    res.status(500).json({ error: "Failed to fetch nearby grass spots" });
  }
}
