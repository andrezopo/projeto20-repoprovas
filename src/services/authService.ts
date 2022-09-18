import { getUserByEmail, insertUser } from "../repositories/authRepository";

import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { User } from "../types/userType";

dotenv.config();

export async function signUp(user: User) {
  const dbUser = await getUserByEmail(user.email);
  if (dbUser) {
    throw { type: "conflict", message: "Could not create account!" };
  }
  const saltRounds = process.env.SALT_ROUNDS;
  const salt = bcrypt.genSaltSync(parseInt(saltRounds));
  const encodedPassword = bcrypt.hashSync(user.password, salt);
  await insertUser({ email: user.email, password: encodedPassword });
}

export async function signIn(user: User) {
  const dbUser = await getUserByEmail(user.email);
  if (!dbUser) {
    throw { type: "unauthorized", message: "e-mail and/or password incorrect" };
  }
  const isCorrectPassword = bcrypt.compareSync(user.password, dbUser.password);
  if (!isCorrectPassword) {
    throw { type: "unauthorized", message: "e-mail and/or password incorrect" };
  }
  const secret = process.env.SECRET;
  const token = jwt.sign({ id: dbUser.id }, secret, { expiresIn: 60 * 20 });
  return token;
}
