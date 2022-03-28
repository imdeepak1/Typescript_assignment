import jwt from "jsonwebtoken";
import User from "../model/user";
import { Request, NextFunction, Response, request } from "express";

async function auth(req: Request, res: Response, next: NextFunction){
  const token =
    req.body.token || req.query.token || req.headers["x-access-token"];

  if (!token) {
    return res.status(403).send("A token is required for authentication");
  }
  try {
    const decoded:any = await jwt.verify(token, "secret");
    await User.findOne({_id:decoded.user_id})
    req.query = decoded;
  } catch (err) {
    return res.status(401).send("Invalid Token");
  }
  return next();
};

export default auth;
