import { bookModel } from '../models/bookModel.js';
import { isUpdatable } from '../helpers/isUpdatable.js';

async function create(req, res) {
    const newBook = new bookModel({
        ...req.body,
        createdBy: req.user._id,
    });

    try {
        await newBook.save();
        res.status(201).send({ newBook });
    } catch (error) {
        res.status(400).send({ error });
    }
}

async function bookDetail(req, res) {
    try {
        const bookTarget = await bookModel.findOne({
            _id: req.params.bookId,
            createdBy: req.user._id,
        });
        if (!bookTarget) {
            throw new Error(`Can not find this book of user: ${req.user.name}`);
        }
        await bookTarget.populate('createdBy');
        res.send({ bookTarget });
    } catch (error) {
        res.send(error.message);
    }
}

async function updateById(req, res, next) {
    const reqKeys = Object.keys(req.body);
    const updatableKeys = ['name', 'description', 'progress', 'people'];
    if (isUpdatable(reqKeys, updatableKeys)) {
        try {
            const book = await bookModel.findOne({
                _id: req.params.bookId,
                createdBy: req.user._id,
            });
            if (!book) {
                throw new Error(`can not find book`);
            }
            reqKeys.forEach((reqKey) => (book[reqKey] = req.body[reqKey]));
            const updatedbook = await book.save();
            res.send(book);
        } catch (error) {
            res.send(error.message);
        }
    } else {
        res.send('Do not allow to update property');
    }
}
async function deleteById(req, res) {
    try {
        const deletedbook = await bookModel.findOneAndDelete({
            _id: req.params.bookId,
            createdBy: req.user._id,
        });
        res.send(deletedbook);
    } catch (error) {
        res.send(error);
    }
}
async function deleteBooks(req, res) {
    try {
        const listbook = req.body.bookIds;
        const listDeletedbook = listbook.map((bookId) =>
            bookModel.findByIdAndDelete(bookId)
        );
        await Promise.all(listDeletedbook);
        res.send('delete ok');
    } catch (error) {
        console.log(error);
    }
}

async function listBook(req, res) {
    try {
        const sortOption = req.query.sortBy.split(':');
        const orderBy = sortOption[1] === 'asc' ? 1 : -1;
        const books = await bookModel
            .find({ createdBy: req.user._id, progress: req.query.progress })
            .limit(+req.query.limit)
            .skip(+req.query.skip)
            .sort({ [sortOption[0]]: orderBy });

        res.send(books);
    } catch (e) {
        res.send({ error: e.message });
    }
}

export { create, updateById, deleteBooks, deleteById, bookDetail, listBook };
