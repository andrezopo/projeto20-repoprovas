import { Router } from "express";
import {
  createTest,
  getTestsGroupByDiscipline,
} from "../controllers/testsController";
import validateSchema from "../middlewares/validateSchema";
import validateToken from "../middlewares/validateToken";
import testSchema from "../schemas/testSchema";

const testRouter = Router();

testRouter.post("/", validateSchema(testSchema), validateToken, createTest);

testRouter.get("/disciplines", validateToken, getTestsGroupByDiscipline);

export default testRouter;
