import cors from "cors";
import express, { json, request, response } from "express";
import db from "../src/config/db.js";
import { Sequelize } from "sequelize";

import studentRoute from "./student/rest/students-routes.js";
import courseRoute from "./course/rest/courses-routes.js";
import bookRoute from "./book/rest/books-routes.js";
import enrolmentRoute from "./enrolment/rest/enrolment-routes.js";

const app = express();

app.use(cors());

app.use(express.json());

app.use("/api/v1/students", studentRoute);
app.use("/api/v1/course", courseRoute);
app.use("/api/v1/book", bookRoute);
app.use("/api/v1/enrolment", enrolmentRoute);

db.sequelize.sync().then((result) => {
  app.listen(2020, () => {
    console.log("Servers is listening on 2020");
  });
});
