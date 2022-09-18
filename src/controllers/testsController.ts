import { Request, Response } from "express";
import { CreatingTest } from "../types/testTypes";
import * as testsService from "../services/testsService";

export async function createTest(req: Request, res: Response) {
  const test: CreatingTest = req.body;
  const createdTest = await testsService.createTest(test);
  res.status(201).send(createdTest);
}
