import db from "../../config/db.js";
import bcrypt from "bcrypt";
import asyncHandler from "express-async-handler";
import generateToken from "../../utile/crypted.js";

let getAll = asyncHandler(async (req, res) => {
  let all = await db.models.Student.findAll();
  res.status(200).json(all);
});

const addStudent = asyncHandler(async (req, res) => {
  let obj = req.body;
  console.log(obj, "this is obj");
  let foundUser = await db.models.Student.findOne({
    where: {
      email: obj.email,
    },
  });

  if (foundUser) {
    res.status(403).json({
      error: `This email address is already registered`,
    });
  } else {
    let user = await db.models.Student.create(obj);
    console.log(user, "this is my user");

    res.status(200).json({
      token: generateToken(
        user.id,
        user.firstName,
        user.lastName,
        user.email,
        user.password,
        user.age
      ),
    });
  }
});

const deleteStudent = asyncHandler(async (req, res) => {
  let { id } = req.params;
  let student = await db.models.Student.findByPk(id);

  if (student) {
    await student.destroy();
  }
  res.status(200).end();
});

const updateStudent = asyncHandler(async (req, res) => {
  let { id } = req.params;
  let student = await db.models.Student.findByPk(id);

  let obj = req.body;

  if (student) {
    student.set(obj.Student);
  }

  student.save();
  res.status(200).end();
});

const loginStudent = asyncHandler(async (req, res) => {
  let foundUser = await db.models.Student.findOne({
    where: {
      email: req.body.email,
    },
  });

  if (foundUser) {
    let check = bcrypt.compareSync(
      req.body.password,
      foundUser.confirmedPassword
    );

    if (check) {
      res.status(202).json({
        user: {
          id: foundUser.id,
          firstName: foundUser.firstName,
          lastName: foundUser.lastName,
          email: foundUser.email,
          token: generateToken(foundUser.id, foundUser.email),
        },
      });
    } else {
      res.status(401).json({
        error: `Unauthorized: false password`,
      });
    }
  } else {
    res.status(404).json({
      error: `Have you registered yet?`,
    });
  }
});

export async function verifyLogin(email, password) {
  let students = await db.models.Student.findAll();
  for (let i = 0; i < students.length; i++) {
    if (students[i].email === email && students[i].password === password) {
      return students[i];
    }
  }
  return null;
}

export { getAll, addStudent, deleteStudent, updateStudent, loginStudent };
