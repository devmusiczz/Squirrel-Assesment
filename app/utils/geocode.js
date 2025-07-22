export const getCoordinatesFromAddress = async (address) => {
  try {
    const res = await fetch(
      `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(
        address
      )}&key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}`
    );
    const data = await res.json();
    if (data.status === "OK") {
      return data.results[0].geometry.location;
    } else {
      return null;
    }
  } catch (error) {
    console.error("Geocode error:", error);
    return null;
  }
};
