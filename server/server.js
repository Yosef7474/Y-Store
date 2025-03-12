const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// middleware
app.use(cors());
app.use(express.json());
app.use('/uploads', express.static('uploads'));

// mongodb connection
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log(err));

// routes
app.get('/', (req, res) => {
  res.send('Marketplace api!');
});

// start server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});