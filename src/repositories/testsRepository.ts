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

export async function getAllTestsGroupByDiscipline() {
  return await prisma.terms.findMany({
    where: {},
    distinct: ["number"],
    select: {
      number: true,
      disciplines: {
        distinct: ["name"],
        select: {
          name: true,
          teacherDiscipline: {
            select: {
              teacher: { select: { name: true } },
              Tests: {
                select: {
                  name: true,
                  pdfUrl: true,
                  category: {
                    select: {
                      name: true,
                    },
                  },
                },
                orderBy: { categoryId: "desc" },
              },
            },
          },
        },
      },
    },
  });
}

export async function getAllTestsGroupByTeacher() {
  return await prisma.teachers.findMany({
    where: {},
    distinct: ["name"],
    select: {
      name: true,
      disciplines: {
        select: {
          discipline: { select: { name: true } },
          Tests: {
            select: {
              name: true,
              pdfUrl: true,
              category: { select: { name: true } },
            },
            orderBy: { categoryId: "desc" },
          },
        },
      },
    },
  });
}
