const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const authRoutes = require('./routes/authRoutes');
const productRoutes = require('./routes/productRoutes');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// middleware
app.use(cors());
app.use(express.json());
app.use('/uploads', express.static('uploads'));

app.use('/api/auth', authRoutes);
app.use('/api/products', productRoutes);

// mongodb connection
async function main() {
  await mongoose.connect(process.env.MONGO_URI);
  app.use('/', (req, res) => {
    res.send('server is Running!')
  });
  app.use((req, res) => {
    res.status(404).json({ message: "Route not found" });
  });
}
main().then(() => console.log("MongoDB connected successfully")).catch(err => console.log(err));

// routes
app.get('/', (req, res) => {
  res.send('Marketplace api!');
});

// start server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});