import { Request, Response, NextFunction } from "express";

import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { getUserById } from "../repositories/authRepository";

dotenv.config();

export default async function validateToken(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const { authorization } = req.headers;
    const token = authorization?.replace("Bearer ", "");

    if (!token) {
      return res.status(422).send("Missing token");
    }

    const decodedToken: any = jwt.verify(
      token,
      process.env.SECRET,
      async (err, decoded) => {
        if (err) {
          return res.status(401).send("Unauthorized");
        }
        const user = await getUserById(decoded["id"]);
        if (user.id !== decoded["id"]) {
          return res.status(401).send("Unauthorized");
        }
        res.locals.userId = user.id;
        res.locals.token = token;
        next();
      }
    );
  } catch (err) {
    throw { type: "unauthorized", message: "Invalid or expired token" };
  }
}
