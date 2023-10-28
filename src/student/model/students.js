import { Sequelize } from "sequelize";
import bcrypt from "bcrypt";

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

      password: {
        type: Sequelize.VIRTUAL,
        allowNull: false,

        validate: {
          is: /^(?=.*[A-Z]).{8,}$/i, // Regex constraint for at least 1 uppercase letter and minimum length of 8 characters
        },
      },

      confirmedPassword: {
        type: Sequelize.STRING,
        allowNull: false,
        set(val) {
          if (val == this.password) {
            const hashPassword = bcrypt.hashSync(val, 10);
            this.setDataValue("confirmedPassword", hashPassword);
            return hashPassword;
          }
        },
        validate: {
          is: /^(?=.*[A-Z]).{8,}$/i, // Regex constraint for at least 1 uppercase letter and minimum length of 8 characters
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
