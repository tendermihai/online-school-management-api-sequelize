import db from "../../config/db.js";

import { Op } from "sequelize";

import asyncHandler from "express-async-handler";
import enrolment from "../model/enrolment.js";

let getAll = asyncHandler(async (req, res) => {
  let all = await db.models.Enrolment.findAll();
  res.status(200).json(all);
});

const deleteEnrolment = asyncHandler(async (req, res) => {
  let { id } = req.params;
  let enrolment = await db.models.Enrolment.findByPk(id);

  if (enrolment) {
    await enrolment.destroy();
  }

  res.status(200).end();
});

const addEnrolment = asyncHandler(async (req, res) => {
  try {
    // Simulate an error by throwing an exception

    let obj = req.body;
    let resp = await db.models.Enrolment.create(obj);

    // This code will not be executed because of the error above

    res.status(200).json(resp);
  } catch (error) {
    // Handle the error and send an error response
    res.status(500).json({ error: error.message });
  }
});

const updateEnrolment = asyncHandler(async (req, res) => {
  let { id } = req.params;
  let enrolment = await db.models.Enrolment.findByPk(id);
  let obj = req.body;

  if (enrolment) {
    await enrolment.set(obj.Enrolment);
  }

  enrolment.save();
  res.status(200).end();
});

const findEnrolmentById = asyncHandler(async (req, res) => {
  let { id } = req.params;
  let enrolment = await db.models.Enrolment.findByPk(id);

  if (!enrolment) {
    res.status(404).json({ message: "Enrolment not found." });
    return;
  }

  let student_id = enrolment.student_id;

  let enrolments = await db.models.Enrolment.findAll({
    where: { student_id: student_id },
  });
  // return enrolments;
  res.status(200).json(enrolments);
});

const findCourseByEnrolment = asyncHandler(async (req, res) => {
  let { student_id } = req.params;

  //todo gasimt toate enrolmenturile cu student id

  let enrolments = await db.models.Enrolment.findAll({
    where: { student_id: student_id },
  });

  let coursIds = enrolments.map((enrol) => enrol.course_id);

  let courses = await db.models.Course.findAll({
    where: {
      id: {
        [Op.in]: coursIds,
      },
    },
  });

  res.status(200).json(courses);
});

const unEnrollment = asyncHandler(async (req, res) => {
  console.log("asdasdas");
  try {
    let { course_id } = req.query;
    let { student_id } = req.query;

    let deletedEnrolments = await db.models.Enrolment.destroy({
      where: {
        student_id: student_id,
        course_id: course_id,
      },
    });

    console.log(deletedEnrolments + "asdsad");
    if (deletedEnrolments > 0) {
      console.log(deletedEnrolments, "deletedEnrolments");
      res.status(200).json({
        succes: true,
        payload: deletedEnrolments,
        message: "Enrollment deleted successfully",
      });
    } else {
      res.status(404).json({
        succes: false,
        message: "Enrollment not found",
      });
    }
  } catch (error) {
    console.log("Error while deleting enrollment");
    res.status(500).json({
      succes: false,
      message: "An error occured",
    });
  }

  res.status(200).json(enrolments);
  console.log(enrolments, "this is enrolments");
});

export {
  getAll,
  deleteEnrolment,
  addEnrolment,
  updateEnrolment,
  findEnrolmentById,
  findCourseByEnrolment,
  unEnrollment,
};
