import { Book } from '../models/bookModels.js';

// create a new book
export const createBook = async (request, response) => {
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
};

// fetch all books
export const getBooks = async (request, response) => {
  try {
    const books = await Book.find({});
    return response.status(200).send({ count: books.length, data: books });
  } catch (error) {
    console.log(error);
    response.status(500).send({ message: error.message });
  }
};

// get a book by id
export const getBookById = async (request, response) => {
  try {
    const book = await Book.findById(request.params.id);
    if (book) {
      return response.status(200).send(book);
    }
    return response.status(404).send('Book not found');
  } catch (error) {
    console.log(error);
    response.status(500).send({ message: error.message });
  }
};
