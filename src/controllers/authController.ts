import { Request, Response } from "express";
import { User, SignUp } from "../types/userType";
import * as authService from "../services/authService";

export async function signUp(req: Request, res: Response) {
  const body: SignUp = req.body;
  delete body.confirmPassword;
  const user: User = body;
  await authService.signUp(user);
  res.status(201).send("User created successfully");
}

export async function signIn(req: Request, res: Response) {
  const user: User = req.body;
  const token = await authService.signIn(user);

  res.status(200).send({ email: user.email, token });
}
