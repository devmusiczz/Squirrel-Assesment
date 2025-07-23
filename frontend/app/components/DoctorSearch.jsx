'use client';

import React, { useState, useRef } from 'react';
import { Autocomplete, useLoadScript } from '@react-google-maps/api';
import { getCoordinatesFromAddress } from '../utils/geocode';

const libraries = ['places'];

export default function DoctorSearch() {
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY,
    libraries,
  });

  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [noResults, setNoResults] = useState(false);
  const autocompleteRef = useRef(null);

  const handleSearch = async () => {
    if (!query) return;

    setLoading(true);
    setNoResults(false);
    setResults([]);

    const location = await getCoordinatesFromAddress(query);
    if (!location) {
      setLoading(false);
      return alert('Could not find location');
    }

    try {
      const res = await fetch(
        `https://squirrel-assesment.onrender.com/api/doctors/search?lat=${location.lat}&lng=${location.lng}`
      );
      const data = await res.json();

      if (data.length === 0) {
        setNoResults(true);
      } else {
        setResults(data);
      }
    } catch (err) {
      console.error('Error fetching doctors:', err);
    }

    setLoading(false);
  };

  const handlePlaceChanged = () => {
    const place = autocompleteRef.current?.getPlace();
    if (!place?.formatted_address) return;

    setQuery(place.formatted_address);
  };

  if (!isLoaded) return <div className="max-w-md mx-auto space-y-4">
      <div className="h-10 w-[400px] bg-gray-500 animate-pulse rounded" />
      <div className="h-10 w-[400px] bg-gray-500 animate-pulse rounded" />
    </div>;

  return (
    <div className="min-w-[400px] mx-auto">
      <Autocomplete
        onLoad={(auto) => (autocompleteRef.current = auto)}
        onPlaceChanged={handlePlaceChanged}
      >
        <input
          className="border p-2 mb-2 w-full"
          placeholder="Search by location (e.g. JP Nagar)"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
      </Autocomplete>

      <button
        className="bg-green-600 text-white cursor-pointer px-4 py-2 mb-4 w-full rounded disabled:opacity-50"
        onClick={handleSearch}
        disabled={loading}
      >
        {loading ? 'Searching...' : 'Find Doctors'}
      </button>

      {noResults && (
        <p className="text-red-600 text-sm mb-2">No doctors found in this area.</p>
      )}

      <ul className="text-sm">
        {results.map((doc) => (
          <li key={doc._id} className="border-b p-2">
            <strong>{doc.name}</strong>
            <br />
            {doc.address}
          </li>
        ))}
      </ul>
    </div>
  );
}
