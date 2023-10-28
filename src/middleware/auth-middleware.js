import expressAsyncHandler from "express-async-handler";
import Jwt from "jsonwebtoken";
import db from "../config/db.js";
import { getAll } from "../book/service/books-service.js";

export const protectBooks = expressAsyncHandler(async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      token = req.headers.authorization.split(" ")[1];
      const decoded = Jwt.verify(token, "test");
      req.user = await db.models.Student.findByPk(decoded.id);

      next();
    } catch (error) {
      res.status(401).json("Unauthorized");
    }
  }
});
