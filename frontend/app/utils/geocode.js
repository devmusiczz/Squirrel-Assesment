// src/utils/geocode.js
export const getCoordinatesFromAddress = async (address) => {
  const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;

  if (!apiKey) {
    console.error("❌ Missing Google Maps API key");
    return null;
  }

  const url = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(
    address
  )}&key=${apiKey}`;

  try {
    const res = await fetch(url);
    const data = await res.json();

    if (data.status === "OK") {
      return data.results[0].geometry.location; // ✅ { lat, lng }
    } else {
      console.error("❌ Geocode failed:", data.status, data.error_message);
      return null;
    }
  } catch (error) {
    console.error("❌ Geocode error:", error);
    return null;
  }
};
