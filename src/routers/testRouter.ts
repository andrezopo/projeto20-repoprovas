import { Router } from "express";
import { createTest } from "../controllers/testsController";
import validateSchema from "../middlewares/validateSchema";
import validateToken from "../middlewares/validateToken";
import testSchema from "../schemas/testSchema";

const testRouter = Router();

testRouter.post("/", validateSchema(testSchema), validateToken, createTest);

export default testRouter;
