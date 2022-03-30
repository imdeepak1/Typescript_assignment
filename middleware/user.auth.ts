import jwt from "jsonwebtoken";
import { Request, NextFunction, Response, request } from "express";

async function authorization(req: Request, res: Response, next: NextFunction) {
  const token =
    req.body.token || req.query.token || req.headers["x-access-token"];

  if (!token) {
    return res.status(403).send("A token is required for authentication");
  }
  try {
    const decoded: any = await jwt.verify(token, "secret");
    req.body._id = decoded;
  } catch (err) {
    return res.status(401).send("Invalid Token");
  }
  return next();
}

export default authorization;
