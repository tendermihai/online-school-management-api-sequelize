import express from "express";

import errorHandler from "../../middleware/error-middleware.js";

import {
  getAll,
  deleteEnrolment,
  addEnrolment,
  updateEnrolment,
  findEnrolmentById,
  findCourseByEnrolment,
  unEnrollment,
} from "../service/enrolments-service.js";

const app = express.Router();

app.route("/all").get(getAll, errorHandler);

// app.route(`/delete/:id`).delete(deleteEnrolment, errorHandler);

app.route("/add").post(addEnrolment, errorHandler);

app.route(`/update/:id`).put(updateEnrolment, errorHandler);

app.route("/find/id/:id").get(findEnrolmentById, errorHandler);

app
  .route(`/find/course/id/:student_id`)
  .get(findCourseByEnrolment, errorHandler);

app.route("/delete/enrolment").delete(unEnrollment, errorHandler);

// app.get(
//   "/enrolment",
//   asyncHandler(async (request, response) => {
//     const enrolments = await db.models.Enrolment.findAll();

//     response.status(200).json(enrolments);
//   })
// );

// app.post(
//   "/enrolment/add",
//   asyncHandler(async (request, response) => {
//     const enrolmentData = {
//       student_id: request.body.student_id,
//       course_id: request.body.course_id,
//       createdAt: request.body.createdAt,
//     };

//     const enrolment = await addEnrolment(enrolmentData);

//     response.status(200).json(enrolment);
//   })
// );

export default app;
