import { Sequelize } from "sequelize";

import book from "../models/book.js";
import students from "../models/students.js";
import course from "../models/course.js";
import enrolment from "../models/enrolment.js";

const connectDb = () => {
  try {
    let sequelize = new Sequelize("online_school_db", "root", "password95", {
      host: "localhost",
      dialect: "mysql",
    });

    let db = {
      models: {},
    };

    db.Sequelize = Sequelize;
    db.sequelize = sequelize;
    db.models.students = students(sequelize);
    db.models.course = course(sequelize);
    db.models.book = book(sequelize);

    db.models.enrolment = enrolment(sequelize);

    //many -to-one relationship between  student and book
    db.models.students.hasMany(db.models.book, {
      onDelete: "CASCADE",
      as: "fk_studentId",

      foreignKey: {
        fieldName: "student_id",
        allowNull: false,
      },
    });

    db.models.book.belongsTo(db.models.students, {
      as: "fk_studentId",

      foreignKey: {
        fieldName: "student_id",
        allowNull: false,
      },
    });

    //many to one between student and enrolment
    db.models.students.hasMany(db.models.enrolment, {
      onDelete: "CASCADE",
      as: "fk_student_Id",

      foreignKey: {
        fieldName: "student_id",
        allowNull: false,
      },
    });

    db.models.enrolment.belongsTo(db.models.students, {
      as: "fk_student_Id",
      foreignKey: {
        fieldName: "student_id",
        allowNull: false,
      },
    });

    //many-to-many between enrolment and course

    db.models.course.hasMany(db.models.enrolment, {
      onDelete: "CASCADE",
      as: "fk_courseId",
      foreignKey: {
        fieldName: "course_id",
        allowNull: false,
      },
    });

    db.models.enrolment.belongsTo(db.models.course, {
      as: "fk_courseId",
      foreignKey: {
        fieldName: "course_id",
        allowNull: false,
      },
    });

    return db;
  } catch (error) {
    console.log(error);
  }
};

let db = connectDb();
export default db;
