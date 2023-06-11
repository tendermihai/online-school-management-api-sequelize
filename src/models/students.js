import { Sequelize } from "sequelize";

export default (sequelize) => {
  class Student extends Sequelize.Model {}

  Student.init(
    {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },

      firstName: {
        type: Sequelize.STRING,
        allowNull: false,

        validate: {
          notNull: {
            msg: "Provide a first name",
          },
          notEmpty: {
            msg: "Provide a first name",
          },
        },
      },

      lastName: {
        type: Sequelize.STRING,
        allowNull: false,

        validate: {
          notNull: {
            msg: "Provide a last name",
          },
          notEmpty: {
            msg: "Provide a last name",
          },
        },
      },

      email: {
        type: Sequelize.STRING,
        allowNull: false,

        validate: {
          notNull: {
            msg: "Provide an email",
          },
          notEmpty: {
            msg: "Provide an email",
          },
        },
      },

      age: {
        type: Sequelize.INTEGER,
        allowNull: false,

        validate: {
          notNull: {
            msg: "Provide an age",
          },
          notEmpty: {
            msg: "Provide an age",
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

  return Student;
};
