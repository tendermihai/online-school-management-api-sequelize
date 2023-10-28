import db from "../../config/db.js";

import asyncHandler from "express-async-handler";

let getAll = asyncHandler(async (req, res, next) => {
  let all = await db.models.Course.findAll();
  res.status(200).json(all);
});

let addCourse = asyncHandler(async (req, res) => {
  let obj = req.body;

  await db.models.Course.create(obj);

  res.status(200).end();
});

let deleteCourse = asyncHandler(async (req, res) => {
  let { id } = req.params;
  let course = await db.models.Course.findByPk(id);

  if (course) {
    course.destroy();
    res.status(200).end();
  } else {
    res.status(400).json({ error: "Could not delete course" });
  }
});

const updateCourse = asyncHandler(async (req, res) => {
  let { id } = req.params;
  let course = await db.models.Course.findByPk(id);
  let obj = req.body;
  if (course) {
    course.set(obj.Course);
  }

  course.save();
  res.status(200).end();
});

const verifyStudent = asyncHandler(async (req, res) => {
  let { id } = req.params;
  let enrolment = await db.models.Enrolment.findAll({
    where: { student_id: id },
  });

  let courses = await db.models.Course.findAll();

  let data = courses.map((course) => {
    let enrols = enrolment.filter(
      (enrolment) => enrolment.course_id == course.id
    );

    if (enrols.length > 0) {
      return {
        ...course.dataValues  ,
        enrolled: true,
      };
    } else {
      return {
        ...course.dataValues,
        enrolled: false,
      };
    }
  });

  res.status(200).json(data);
});

export { getAll, deleteCourse, updateCourse, addCourse, verifyStudent };
