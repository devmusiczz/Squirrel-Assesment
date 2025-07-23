'use client'

import React, { useRef, useState } from "react";
import {
  GoogleMap,
  Marker,
  useLoadScript,
  Autocomplete,
} from "@react-google-maps/api";

// Defaut Map Location
const center = { lat: 27.1767, lng: 78.0081}; // AGRA
const mapContainerStyle = {
  height: "300px",
  width: "400px",
};

const libraries = ["places"];

export default function DoctorForm() {
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY,
    libraries,
  });

  
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [marker, setMarker] = useState(null);
  const [mapRef, setMapRef] = useState(null);
  const autocompleteRef = useRef(null);
  const [loading, setLoading] = useState(false);


  if (loadError) return <p>Error loading maps</p>;
  if (!isLoaded) return <div className="max-w-md mx-auto space-y-4">
      <div className="h-10 bg-gray-500 animate-pulse rounded" />
      <div className="h-10 bg-gray-500 animate-pulse rounded" />
      <div className="w-[400px] h-[300px] bg-gray-500 animate-pulse rounded" />
    </div>;

  const handleMapClick = (e) => {
    setMarker({
      lat: e.latLng.lat(),
      lng: e.latLng.lng(),
    });
  };

  const handlePlaceChanged = () => {
    const place = autocompleteRef.current?.getPlace();
    if (!place?.geometry) return;

    const location = place.geometry.location;
    const newPosition = {
      lat: location.lat(),
      lng: location.lng(),
    };

    setMarker(newPosition);
    setAddress(place.formatted_address || "");
    mapRef?.panTo(newPosition);
  };

  const handleSubmit = async () => {
    if (!name || !address || !marker) {
      alert("Please fill all fields and select a location.");
      return;
    }

    setLoading(true);

    try {
      const res = await fetch("https://squirrel-assesment.onrender.com/api/doctors", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          address,
          latitude: marker.lat,
          longitude: marker.lng,
        }),
      });

      const data = await res.json();
      alert("Doctor added!");
      console.log(data);
      setName("");
      setAddress("");
      setMarker(null);
    } catch (err) {
      console.error(err);
      alert("Error saving doctor.");
    }finally {
    setLoading(false); 
  }
  };

  return (
    <div className="max-w-md mx-auto">
      <input
        className="border p-2 mb-2 w-full"
        placeholder="Doctor Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />

      {/* Wrap address input with Autocomplete */}
      <Autocomplete
        onLoad={(auto) => (autocompleteRef.current = auto)}
        onPlaceChanged={handlePlaceChanged}
      >
        <input
          className="border p-2 mb-2 w-full"
          placeholder="Search or enter address"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
        />
      </Autocomplete>

      <GoogleMap
        mapContainerStyle={mapContainerStyle}
        zoom={14}
        center={marker || center}
        onClick={handleMapClick}
        onLoad={(map) => setMapRef(map)}
      >
        {marker && <Marker position={marker} />}
      </GoogleMap>

      <button
        className={`bg-blue-600 text-white px-4 py-2 mt-3 w-full rounded
          ${loading ? "opacity-50 cursor-not-allowed" : "hover:bg-blue-700"}`
        }
        onClick={handleSubmit}
        disabled={loading}
      >
        {loading ? "Saving..." : "Save Doctor"}
      </button>

    </div>
  );
}
