import joi from "joi";
import { CreatingTest } from "../types/testTypes";

const testSchema = joi.object<CreatingTest>({
  name: joi.string().required(),
  pdfUrl: joi.string().uri().required(),
  categoryId: joi.number().integer().min(1).max(8).required(),
  disciplineId: joi.number().required(),
  teacherId: joi.number().required(),
});

export default testSchema;
