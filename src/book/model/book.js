import { Sequelize } from "sequelize";

export default (sequelize) => {
  class Book extends Sequelize.Model {}

  Book.init(
    {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },

      bookName: {
        type: Sequelize.STRING,
        allowNull: false,

        validate: {
          notNull: {
            msg: "Provide a book name",
          },

          notEmpty: {
            msg: "Provide a book name",
          },
        },
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

  return Book;
};
