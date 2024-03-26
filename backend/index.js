import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';

import { PORT, mongoDBURL } from './config.js';
import bookRoutes from './routes/books.js';

const app = express();

// middleware for parsing request body
app.use(express.json());

// middleware for handling CORS requests
// option 1: allow all origins with default of cors
app.use(cors());
// option 2: allow custom origins
// app.use(
//   cors({
//     origin: 'http://localhost:3000',
//     methods: 'GET, POST, PUT, DELETE',
//     allowedHeaders: 'Content-Type',
//   })
// );

app.use('/books', bookRoutes);

app.get('/', (req, res) => {
  console.log(req.url);
  res.status(200).send('Hello World!');
});

mongoose
  .connect(mongoDBURL)
  .then(() => {
    console.log('App connected to database');
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch(err => {
    console.log(err);
  });
