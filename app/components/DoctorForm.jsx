'use client'
import React, { useState } from "react";
import { GoogleMap, Marker, useLoadScript } from "@react-google-maps/api";

const center = { lat: 12.9352, lng: 77.6146 }; // Bangalore

const mapContainerStyle = {
  height: "300px",
  width: "400px",
};

export default function DoctorForm() {
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY

  });
  

  const [marker, setMarker] = useState(null);
  const [name, setName] = useState("");

  const handleMapClick = (e) => {
    setMarker({
      lat: e.latLng.lat(),
      lng: e.latLng.lng(),
    });
  };

  const handleSubmit = async () => {
    if (!name || !marker) return alert("Enter name and select location");

    const res = await fetch("http://localhost:8080/api/doctors", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name,
        address: "Sample Address",
        latitude: marker.lat,
        longitude: marker.lng,
      }),
    });

    const data = await res.json();
    alert("Doctor added!");
    console.log(data);
    setName("");
    setMarker(null);
  };

  if (!isLoaded) return <p>Loading map...</p>;

  return (
    <div>
      <input
        className="border p-1 mb-2 w-full"
        placeholder="Doctor Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <GoogleMap
        mapContainerStyle={mapContainerStyle}
        zoom={14}
        center={center}
        onClick={handleMapClick}
      >
        {marker && <Marker position={marker} />}
      </GoogleMap>
      <button className="bg-blue-500 text-white px-4 py-2 mt-2" onClick={handleSubmit}>
        Save Doctor
      </button>
    </div>
  );
}
