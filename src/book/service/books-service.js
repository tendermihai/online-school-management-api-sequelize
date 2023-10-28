import db from "../../config/db.js";
import asyncHandler from "express-async-handler";

let getAll = asyncHandler(async (req, res) => {
  let studentId = req.user.id;
  console.log(studentId, "this is student ID");
  let book = await db.models.Book.findAll({
    where: { student_id: studentId },
  });

  if (book.length === 0) {
    return res.status(401).json("User has no books");
  }
  res.status(200).json(book);
});

const addBook = asyncHandler(async (req, res) => {
  try {
    const { bookName, createdAt, student_id } = req.body;

    // Example code for adding the book to the database
    await db.models.Book.create({
      bookName: bookName,
      createdAt: createdAt,
      student_id: student_id,
    });

    res.status(200).json({
      type: "success",
      payload: "Book successfully added",
    });
  } catch (error) {
    console.error("An error occurred while adding the book:", error);

    res.status(500).json({
      type: "error",
      payload: "An error occurred while adding the book",
    });
  }
});

let deleteBook = asyncHandler(async (req, res) => {
  let id = req.params.id;
  let book = await db.models.Book.findByPk(id);
  console.log(id, "this is book id");

  if (book) {
    await book.destroy();
    res.status(200).json({ message: "Book successfully deleted" });
  } else {
    res.status(400).json({ error: "Could not delete book" });
  }
});

const updateBook = asyncHandler(async (req, res) => {
  const { id } = req.params;
  console.log(id, "this is id");

  const book = await db.models.Book.findByPk(id);

  let obj = req.body.book;

  console.log(obj);

  console.log(obj, " this is my obj");
  if (obj.bookName != "") {
    book.bookName = obj.bookName;
  }

  if (obj.createdAt != "") {
    book.createdAt = obj.createdAt;
  }

  if (obj.student_id != "") {
    book.student_id = obj.student_id;
  }

  await book.save();

  res.status(200).json("Book has been successfully updated.");
});

const getBookByStudentId = asyncHandler(async (req, res) => {
  let { id } = req.params;
  let books = await db.models.Book.findAll({
    where: { student_id: id },
  });

  res.status(200).json(books);
});

//get book by ID

const getBookById = asyncHandler(async (req, res) => {
  let { id } = req.params;
  let book = await db.models.Book.findByPk(id);

  if (!book) {
    req.status(404).json({ message: "Cannot find book" });
    return;
  }

  res.status(200).json(book);
});

export {
  getAll,
  addBook,
  deleteBook,
  updateBook,
  getBookByStudentId,
  getBookById,
};
