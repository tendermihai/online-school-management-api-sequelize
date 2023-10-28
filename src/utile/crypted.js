import Jwt from "jsonwebtoken";

const generateToken = (id, firstName, lastName, email, password, age) => {
  return Jwt.sign({ id, firstName, lastName, email, password, age }, "test", {
    expiresIn: "30d",
  });
};

export default generateToken;
