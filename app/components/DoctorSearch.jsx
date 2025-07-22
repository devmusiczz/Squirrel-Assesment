'use client'
import React, { useState } from "react";
import { getCoordinatesFromAddress } from "../utils/geocode";

export default function DoctorSearch() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);

  const handleSearch = async () => {
    if (!query) return;

    const location = await getCoordinatesFromAddress(query);
    if (!location) return alert("Could not find location");

    const res = await fetch(
      `http://localhost:5000/api/doctors/search?lat=${location.lat}&lng=${location.lng}`
    );
    const data = await res.json();
    setResults(data);
  };

  return (
    <div>
      <input
        className="border p-1 mb-2 w-full"
        placeholder="Search e.g. JP Nagar"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      <button className="bg-green-600 text-white px-4 py-2 mb-4" onClick={handleSearch}>
        Find Doctors
      </button>
      <ul className="text-sm">
        {results.map((doc) => (
          <li key={doc._id} className="border-b p-2">
            <strong>{doc.name}</strong><br />
            {doc.address}
          </li>
        ))}
      </ul>
    </div>
  );
}
