import { Router } from "express";
import {
  createTest,
  getTestsGroupByDiscipline,
  getTestsGroupByTeacher,
} from "../controllers/testsController";
import validateSchema from "../middlewares/validateSchema";
import validateToken from "../middlewares/validateToken";
import testSchema from "../schemas/testSchema";

const testRouter = Router();

testRouter.post("/", validateSchema(testSchema), validateToken, createTest);

testRouter.get("/disciplines", validateToken, getTestsGroupByDiscipline);

testRouter.get("/teachers", validateToken, getTestsGroupByTeacher);

export default testRouter;
