# 🩺 Doctor Location Form (with Google Maps)

This is a simple form built using **React (Next.js)** and **@react-google-maps/api** that allows users to:

- Enter a doctor's name
- Search and select a location using Google Places Autocomplete
- Drop a marker on the map
- Save the doctor's name and selected location to a backend server

## 🧰 Tech Stack

- React (Next.js App)
- Tailwind CSS for UI
- Google Maps JavaScript API (`@react-google-maps/api`)
- REST API integration (via fetch)

---

## 🚀 Features

- 📍 Google Places Autocomplete input
- 🗺️ Google Map with Marker on click
- 🔄 Dynamic form with loading state
- 📤 Sends form data to a backend API

---

## 📦 Installation

1. **Clone this repo:**
   ```bash
   git clone https://github.com/your-username/doctor-map-form.git
   cd doctor-map-form
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Set up environment variable:**

   Create a `.env.local` file in the root of your project:

   ```env
   NEXT_PUBLIC_GOOGLE_MAPS_API_KEY=your_google_maps_api_key
   ```

---

## 🧪 Usage

Start your dev server:

```bash
npm run dev
```

Visit: `http://localhost:3000`

- Fill in the doctor's name.
- Search for an address using the autocomplete input.
- Select a location or click directly on the map.
- Click **"Save Doctor"** – the form will send data to the backend.

---

## 📡 API Format

POST request is sent to:

```
https://squirrel-assesment.onrender.com/api/doctors
```

Payload format:

```json
{
  "name": "Dr. Jane Doe",
  "address": "Agra, India",
  "latitude": 27.1767,
  "longitude": 78.0081
}
```
