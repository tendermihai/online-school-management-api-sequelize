import { Sequelize } from "sequelize";

export default (sequelize) => {
  class Course extends Sequelize.Model {}

  Course.init(
    {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },

      name: {
        type: Sequelize.STRING,
        allowNull: false,

        validate: {
          notNull: {
            msg: "Provide a course name",
          },
          notEmpty: {
            msg: "Provide a course name",
          },
        },
      },

      department: {
        type: Sequelize.STRING,
        allowNull: false,

        validate: {
          notNull: {
            msg: "Provide a department",
          },
          notEmpty: {
            msg: "Provide a department",
          },
        },
      },
    },
    {
      sequelize,
      timestamps: false,
      createdAt: false,
      updatedAt: false,
    }
  );

  return Course;
};
