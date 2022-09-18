import { Router } from "express";
import { signIn, signUp } from "../controllers/authController";
import validateSchema from "../middlewares/validateSchema";
import { signInSchema, signUpSchema } from "../schemas/userSchema";

const authRouter = Router();

authRouter.post("/sign-up", validateSchema(signUpSchema), signUp);

authRouter.post("/", validateSchema(signInSchema), signIn);

export default authRouter;
