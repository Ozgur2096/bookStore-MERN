import express from 'express';
import mongoose from 'mongoose';
import { PORT, mongoDBURL } from './config.js';

import { Book } from './models/bookModels.js';

const app = express();

// middleware for parsing request body
app.use(express.json());

app.get('/', (req, res) => {
  console.log(req.url);
  res.status(200).send('Hello World!');
});

// route for saving a new book
app.post('/books', async (request, response) => {
  try {
    if (
      !request.body.title ||
      !request.body.author ||
      !request.body.publicationYear
    ) {
      return response
        .status(400)
        .send('Please provide all the required fields');
    }
    const newBook = new Book({
      title: request.body.title,
      author: request.body.author,
      publicationYear: request.body.publicationYear,
    });
    const book = await Book.create(newBook);
    return response.status(201).send(book);
  } catch (error) {
    console.log(error);
    response.status(500).send({ message: error.message });
  }
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
