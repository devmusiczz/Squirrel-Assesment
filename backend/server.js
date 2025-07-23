const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config();

const app = express();

app.use(cors({
  origin: [
    "http://localhost:3000",                      // dev
    "https://squirrel-assesment.vercel.app"       // deployed
  ],
  methods: ["GET", "POST"],
}));

app.use(express.json()); // Parse JSON request bodies

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log("MongoDB connected"))
.catch(err => console.error("MongoDB connection error:", err));


// ROUTES
app.use('/api/doctors', require('./routes/doctors'));

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

