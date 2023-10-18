import express from "express";
import {
  getAll,
  addStudent,
  updateStudent,
  deleteStudent,
  loginStudent,
} from "../service/students-service.js";
import errorHandler from "../../middleware/error-middleware.js";

import { verifyLogin } from "../service/students-service.js";

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

app.route("/register").post(addStudent, errorHandler);

app.route(`/delete/:id`).delete(deleteStudent, errorHandler);

app.route(`/update/:id`).put(updateStudent, errorHandler);

app.route("/login").post(loginStudent, errorHandler);

// app.get(
//   "/all",
//   asyncHandler(async (request, response) => {
//     let data = await db.models.Student.findAll();
//     response.status(200).json(data);
//   })
// );

// app.post("/login", async (request, response) => {
//   let login = {
//     email: request.body.email,
//     password: request.body.password,
//   };

//   let resp = await verifyLogin(request.body.email, request.body.password);

//   if (resp == null) {
//     response.status(403).json("Credentials are not correct.");
//   } else {
//     response.status(200).json(resp);
//   }
// });

// app.post("/register", async (request, response) => {
//   let student = {
//     firstName: request.body.firstName,
//     lastName: request.body.lastName,
//     email: request.body.email,
//     password: request.body.password,
//     age: request.body.age,
//   };

//   await db.models.Student.create(student);
//   response.status(200).json("Student has been registered");
// });

// app.delete(
//   `/delete/:id`,
//   asyncHandler(async (request, response) => {
//     let id = request.params.id;
//     console.log(id, "asta e id");
//     const student = await db.models.Student.findByPk(id);

//     if (student != null) {
//       await student.destroy();

//       response.status(200).json("Student has been successfully deleted.");
//     } else {
//       response.status(200).json(`There is no student with id ${id}`);
//     }
//   })
// );

// app.put(
//   `/update/:id`,
//   asyncHandler(async (request, response) => {
//     let { id } = request.params;
//     console.log(id);

//     const student = await db.models.Student.findByPk(id);

//     let obj = request.body.Student;
//     console.log(obj);

//     await db.models.Student.update(obj, {
//       where: { id },
//     });

//     response.status(200).json("Student has been successfully edited");
//   })
// );

export default app;
