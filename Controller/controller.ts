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
    const user_id = req.body._id.user_id;
    const user:any = await User.findOne({ _id: user_id});
    res.status(200).send(`User login Successfully : \n ${user}`);
  } catch (err) {
    return res.status(401).send("Invalid Token");
  }
}

async function getAllUser(req: Request, res: Response, next: NextFunction) {
  const user = await User.find();
  res.status(200).send(`These All Are Users : \n ${user}`);
}


async function getUserDetails(req: Request, res: Response, next: NextFunction) {
  try {
    const user_id = req.body._id.user_id;
    const user:any = await User.findOne({ _id: user_id});
    res.status(200).send(user);
  } catch (err) {
    return res.status(401).send("Invalid Token");
  }
}

async function deleteUser(req: Request, res: Response, next: NextFunction) {
  try {
    const user_id = req.body._id.user_id;
    const user:any = await User.findByIdAndRemove({_id:user_id});
    res.end(`This User Account Delete Successfully : \n ${user}`);
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
    const user_id = req.body._id.user_id;
    const user:any = await User.findOne({ _id: user_id});
    user.status = "Deactive";
    user.save();
    res.send(`User Deactivate successfully : \n ${user}`);
  } catch (err) {
    console.log(err);
  }
}
async function reactivate(req: any, res: any) {
  try {
    const user_id = req.body._id.user_id;
    const user:any = await User.findOne({ _id: user_id});
    user.status = "Active";
    user.save();
    res.send(`User Reactivate successfully : \n ${user}`);
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
