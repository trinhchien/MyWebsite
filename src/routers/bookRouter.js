import express from 'express';
import * as bookController from '../controllers/bookController.js';
import { auth } from '../middlewares/auth.js';

const bookRouter = express.Router();

bookRouter.route('/create').post(auth, bookController.create);

//GET /api/books
// ?progress=complete
// &limit=10
// &skip=10
// &sortBy=createAt:desc

bookRouter.route('/delete').delete(auth, bookController.deleteBooks);
bookRouter.route('/delete/:bookId').delete(auth, bookController.deleteById);
bookRouter.route('/update/:bookId').patch(auth, bookController.updateById);
bookRouter.route('/:bookId').get(auth, bookController.bookDetail);
bookRouter.route('/').get(auth, bookController.listBook);

export { bookRouter };
