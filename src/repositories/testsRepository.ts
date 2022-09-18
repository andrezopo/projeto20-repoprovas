import prisma from "../database";
import { Test } from "../types/testTypes";

export async function getTeacherById(id: number) {
  return await prisma.teachers.findUnique({ where: { id } });
}

export async function getDisciplineById(id: number) {
  return await prisma.disciplines.findUnique({ where: { id } });
}

export async function insertNewTest(test: Test) {
  await prisma.tests.create({ data: test });
}
