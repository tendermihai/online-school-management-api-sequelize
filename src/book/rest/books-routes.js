import express from "express";
import { protectBooks } from "../../middleware/auth-middleware.js";
import {
  getAll,
  addBook,
  deleteBook,
  updateBook,
  getBookByStudentId,
  getBookById,
} from "../../book/service/books-service.js";
import errorHandler from "../../middleware/error-middleware.js";

const app = express.Router();

function asyncHandler(cb) {
  return async (req, res, next) => {
    try {
      await cb(req, res, next);
    } catch (err) {
      next(err);
    }
  };
}

app.route("/all").get(protectBooks, getAll, errorHandler);

app.route("/add").post(addBook, errorHandler);

app.route(`/delete/:id`).delete(deleteBook, errorHandler);

app.route(`/update/:id`).put(updateBook, errorHandler);

app.route(`/find/:id`).get(getBookByStudentId, errorHandler);

app.route(`/find/by/bookId/:id`).get(getBookById, asyncHandler);

// app.get(
//   "/all",
//   asyncHandler(async (request, response) => {
//     let data = await db.models.Book.findAll();
//     response.status(200).json(data);
//   })
// );

// app.post(
//   "/add",
//   asyncHandler(async (request, response) => {
//     let book = {
//       bookName: request.body.bookName,
//       createdAt: request.body.createdAt,
//       student_id: request.body.student_id,
//     };

//     await db.models.Book.create(book);
//     response.status(200).json("Book successfully created.");
//   })
// );

// app.delete(
//   `/delete/:id`,
//   asyncHandler(async (request, response) => {
//     let id = request.params.id;
//     const book = await db.models.Book.findByPk(id);

//     if (book != null) {
//       await book.destroy();
//       response.status(200).json("Book has been successfully deleted.");
//     } else {
//       response.status(200).json(`There is no book with the id ${id}`);
//     }
//   })
// );

// app.put(
//   `/update/:id`,
//   asyncHandler(async (request, response) => {
//     let { id } = request.params;
//     console.log(id);

//     const book = await db.models.Book.findByPk(id);

//     let obj = request.body;
//     console.log(obj);

//     if (book) {
//       await book.update(obj);
//       response.status(200).json("Book has been successfully updated.");
//     } else {
//       response.status(404).json(`Book with ID ${id} not found.`);
//     }
//   })
// );

export default app;
