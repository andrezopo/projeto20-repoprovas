import joi from "joi";
import { SignUp, User } from "../types/userType";

export const signInSchema = joi.object<User>({
  email: joi.string().email().required(),
  password: joi.string().required(),
});

export const signUpSchema = joi.object<SignUp>({
  email: joi.string().email().required(),
  password: joi.string().required(),
  confirmPassword: joi.string().valid(joi.ref("password")).required(),
});
