import { Sequelize, DataTypes } from "sequelize";

export default (sequelize) => {
  class Enrolment extends Sequelize.Model {}

  Enrolment.init(
    {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },

      createdAt: {
        type: Sequelize.DATEONLY,
        allowNull: false,

        validate: {
          notNull: {
            msg: "Provide a date",
          },
          notEmpty: {
            msg: "Provide a date",
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

  return Enrolment;
};
