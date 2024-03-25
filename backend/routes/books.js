import express from 'express';

import {
  createBook,
  getBooks,
  getBookById,
  updateBook,
  deleteBook,
} from '../controllers/books.js';

const router = express.Router();
// all routes here start with /books

router.post('/', createBook);
router.get('/', getBooks);
router.get('/:id', getBookById);
router.put('/:id', updateBook);
router.delete('/:id', deleteBook);

export default router;
