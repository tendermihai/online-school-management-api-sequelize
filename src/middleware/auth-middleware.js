export const protectBooks = expressAsyncHandler(async (req, res, next) => {
  let token;

  if (
    req.header.authorization &&
    req.header.authorization.startsWith("Bearer")
  ) {
    try {
      token = req.headers.authorization.split("")[1];
      const decoded = Jwt.verify(token, "test");
      req.user = await db.models.Student.findByPk(decoded.id);

      next();
    } catch (error) {
      res.status(401).json("Unauthorized");
    }
  }
});
