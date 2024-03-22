import express from 'express';

import { createBook, getBooks, getBookById } from '../controllers/books.js';

const router = express.Router();
// all routes here start with /books

router.post('/', createBook);
router.get('/', getBooks);
router.get('/:id', getBookById);

export default router;
