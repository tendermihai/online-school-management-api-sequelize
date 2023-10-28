import { Sequelize } from "sequelize";

import Book from "../book/model/book.js";
import Student from "../student/model/students.js";
import Course from "../course/model/course.js";
import Enrolment from "../enrolment/model/enrolment.js";

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
    db.models.Student = Student(sequelize);
    db.models.Course = Course(sequelize);
    db.models.Book = Book(sequelize);

    db.models.Enrolment = Enrolment(sequelize);

    //many -to-one relationship between  student and book
    db.models.Student.hasMany(db.models.Book, {
      onDelete: "CASCADE",
      as: "fk_studentId",

      foreignKey: {
        fieldName: "student_id",
        allowNull: false,
      },
    });

    db.models.Book.belongsTo(db.models.Student, {
      as: "fk_studentId",

      foreignKey: {
        fieldName: "student_id",
        allowNull: false,
      },
    });

    //many to one between student and enrolment
    db.models.Student.hasMany(db.models.Enrolment, {
      onDelete: "CASCADE",
      as: "fk_student_Id",

      foreignKey: {
        fieldName: "student_id",
        allowNull: false,
      },
    });

    db.models.Enrolment.belongsTo(db.models.Student, {
      as: "fk_student_Id",
      foreignKey: {
        fieldName: "student_id",
        allowNull: false,
      },
    });

    //many-to-many between enrolment and course

    db.models.Course.hasMany(db.models.Enrolment, {
      onDelete: "CASCADE",
      as: "fk_courseId",
      foreignKey: {
        fieldName: "course_id",
        allowNull: false,
      },
    });

    db.models.Enrolment.belongsTo(db.models.Course, {
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
