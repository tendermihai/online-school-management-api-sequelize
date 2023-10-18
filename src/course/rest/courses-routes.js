import express from "express";
import {
  getAll,
  deleteCourse,
  addCourse,
  updateCourse,
  verifyStudent,
} from "../service/courses-service.js";
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

app.route("/all").get(getAll, errorHandler);

app.route("/add").post(addCourse, errorHandler);

app.route(`/delete/:id`).delete(deleteCourse, errorHandler);

app.route(`/update/:id`).put(updateCourse, errorHandler);

app.route("/verify/:id").get(verifyStudent, errorHandler);

// app.delete(
//   `/delete/:id`,
//   asyncHandler(async (request, response) => {
//     let id = request.params.id;
//     const course = await db.models.Course.findByPk(id);

//     if (course != null) {
//       course.destroy();
//       response.status(200).json("Course has been successfully deleted.");
//     } else {
//       response.status(200).json(`There is not book with the id ${id}`);
//     }
//   })
// );

// app.put(
//   `/update/:id`,
//   asyncHandler(async (request, response) => {
//     let { id } = request.params.id;
//     const course = await db.models.Course.findByPk(id);

//     let obj = request.body.Course;

//     await db.models.Course.update(obj, {
//       where: { id },
//     });

//     response.status(200).json("Course has been successfully updated");
//   })
// );

export default app;
