import { faker } from "@faker-js/faker";
import { CreatingTest } from "../../src/types/testTypes";

export async function testFactory() {
  const disciplineId = faker.datatype.number({ min: 1, max: 6 });
  const teacherId = Math.ceil(disciplineId / 3);
  const test: CreatingTest = {
    name: faker.lorem.word(),
    pdfUrl: faker.internet.url(),
    categoryId: faker.datatype.number({ min: 1, max: 8 }),
    disciplineId,
    teacherId,
  };
  return test;
}
