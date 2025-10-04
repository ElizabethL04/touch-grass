import axios from "axios";

export default async function handler(req, res) {
  const { lat, lng } = req.query;

  // Validate query
  if (!lat || !lng) {
    return res.status(400).json({ error: "Missing lat or lng query parameter" });
  }

  // Use your Google API key from environment variables
  const GOOGLE_API_KEY = process.env.GOOGLE_API_KEY;
  if (!GOOGLE_API_KEY) {
    return res.status(500).json({ error: "Google API key not configured" });
  }

  const url = `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${lat},${lng}&radius=3000&type=park&keyword=grass&key=${GOOGLE_API_KEY}`;

  try {
    const response = await axios.get(url);

    // Return only top 5 results
    const top5 = response.data.results.slice(0, 5).map(place => ({
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
