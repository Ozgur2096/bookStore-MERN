import express from 'express';
import mongoose from 'mongoose';
import { PORT, mongoDBURL } from './config.js';

import bookRoutes from './routes/books.js';

const app = express();

// middleware for parsing request body
app.use(express.json());

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
