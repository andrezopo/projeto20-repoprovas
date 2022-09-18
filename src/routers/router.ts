import { Router } from "express";
import authRouter from "./authRouter";
import testRouter from "./testRouter";

const router = Router();

router.use("/", authRouter);
router.use("/tests", testRouter);

export default router;
