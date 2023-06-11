import cors from "cors";
import express, { json, request, response } from "express";
import db from "./config/db.js";
import { Sequelize } from "sequelize";
import students from "./models/students.js";
import course from "./models/course.js";

const app = express();

app.use(cors());

app.use(express.json());

db.sequelize.sync().then((result) => {
  app.listen(3030, () => {
    console.log("Servers is listening on 3030");
  });
});
