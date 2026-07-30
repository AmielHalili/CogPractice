import app from './app.js';

import dotenv from 'dotenv';
import mongoose from 'mongoose';

//import { initData } from './services/bankService.js';

dotenv.config();



mongoose.connect(process.env.MONGO_URI)
    .then(async () => {
        console.log('Connected to MongoDB');
    })
    .catch((error) => {
        console.error('Error connecting to MongoDB:', error);
    });

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🚀 Server is running seamlessly on http://localhost:${PORT}`);
});
