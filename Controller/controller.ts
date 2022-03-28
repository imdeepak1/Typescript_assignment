import connection from "../config/database";
import express from "express";
import { Request, NextFunction, Response } from "express";
import md5 from "md5";
import jwt from "jsonwebtoken";
import User from "../model/user";
export const app = express();
connection();
app.use(express.json());

async function signup(req: Request, res: Response, next: NextFunction) {
  try {
    const { first_name, last_name, email, password } = req.body;
    if (!(email && password && first_name && last_name)) {
      res.status(400).send("All input is required");
    }
    const oldUser = await User.findOne({ email });

    if (oldUser) {
      return res.status(409).send("User Already Exist. Please Login");
    }
    const encryptedPassword = md5(password);
    const user = await User.create({
      first_name,
      last_name,
      email: email.toLowerCase(),
      password: encryptedPassword,
    });
    const token = jwt.sign({ user_id: user._id, email }, "secret", {
      expiresIn: "1y",
    });
    user.token = token;
    res.status(201).json(user);
    console.log("User Sign-up Process Done :)");
  } catch (err) {
    console.log(err);
  }
}

async function login(req: Request, res: Response, next: NextFunction) {
  try {
    const token: any =
      req.body.token || req.query.token || req.headers["x-access-token"];
    if (!token) {
      res.status(400).send("A token is required for authentication");
    }
    const decoded: any = jwt.verify(token, "secret");
    await User.findOne({ _id: decoded.user_id });
    res.status(200).send("User Successfully Login");
  } catch (err) {
    return res.status(401).send("Invalid Token");
  }
}

async function getAllUser(req: Request, res: Response, next: NextFunction) {
  const user = await User.find();
  res.status(200).json(user);
}
async function getUserDetails(req: Request, res: Response, next: NextFunction) {
  try {
    const token: any =
      req.body.token || req.query.token || req.headers["x-access-token"];
    if (!token) {
      res.status(400).send("Token Required");
    }
    const decoded: any = jwt.verify(token, "secret");
    const detail: any = await User.findOne({ _id: decoded.user_id });
    res.status(200).json(detail);
  } catch (err) {
    return res.status(401).send("Invalid Token");
  }
}

async function deleteUser(req: Request, res: Response, next: NextFunction) {
  try {
    const { email, password } = req.body;
    if (!(email && password)) {
      res.status(400).send("All input is required");
    }
    const user = await User.findOne({ email });
    await User.findByIdAndRemove(user);
    res.end("User Delete Successfully");
  } catch (err) {
    return res.status(401).send("Invalid Details");
  }
}
async function updateUser(req: Request, res: Response, next: NextFunction) {
  try {
    const { first_name, last_name, email, password } = req.body;
    if (!(email && password && first_name && last_name)) {
      res.status(400).send("All input is required");
    }
    const u: any = await User.findOne({ email });
    const encryptedPassword = md5(password);
    const user = await u.updateOne({
      first_name,
      last_name,
      email,
      password: encryptedPassword,
    });
    res.status(201).json({ user, "User Updation Process Done": String });
  } catch (err) {
    return res.status(401).send("Invalid Details");
  }
}
async function deactivate(req: any, res: any) {
  try {
    const { email, password } = req.body;
    if (!(email && password)) {
      res.status(400).send("All input is required");
    }
    const users: any = await User.findOne({ email });
    users.status = "Deactive";
    users.save();
    res.json("User Deactivate successfully");
  } catch (err) {
    console.log(err);
  }
}
async function reactivate(req: any, res: any) {
  try {
    const { email, password } = req.body;
    if (!(email && password)) {
      res.status(400).send("All input is required");
    }
    const users: any = await User.findOne({ email });
    users.status = "Active";
    users.save();
    res.json("User reactivate successfully");
  } catch (err) {
    console.log(err);
  }
}
async function errs(req: Request, res: Response, next: NextFunction) {
  res.status(404).json({
    success: "false",
    message: "Page not found",
    error: {
      statusCode: 404,
      message: "You reached a route that is not defined on this server",
    },
  });
}
export default {
  signup,
  login,
  getAllUser,
  getUserDetails,
  deleteUser,
  updateUser,
  deactivate,
  reactivate,
  errs,
};
