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
              Tests: {
                distinct: ["categoryId"],
                select: {
                  category: {
                    select: {
                      name: true,
                      tests: {
                        select: {
                          name: true,
                          pdfUrl: true,
                          teacherDiscipline: {
                            select: { teacher: { select: { name: true } } },
                          },
                        },
                      },
                    },
                  },
                },
              },
            },
          },
        },
      },
    },
  });
}
