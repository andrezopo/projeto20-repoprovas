import { takeCoverage } from "v8";
import prisma from "../src/database";

async function main() {
  const termsNumbers = [1, 2, 3, 4, 5, 6];
  const categoriesExamples = ["Projeto", "Prática", "Recuperação"];
  const disciplinesExamples = [
    { name: "HTML e CSS", termId: 1 },
    { name: "JavaScript", termId: 2 },
    { name: "React", termId: 3 },
    { name: "Humildade", termId: 1 },
    { name: "Planejamento", termId: 2 },
    { name: "Autoconfiança", termId: 3 },
  ];
  const teachersExamples = ["Diego Pinho", "Bruna Hamori"];
  const teachersDisciplinesExamples = [
    { teacherId: 1, disciplineId: 1 },
    { teacherId: 1, disciplineId: 2 },
    { teacherId: 1, disciplineId: 3 },
    { teacherId: 2, disciplineId: 4 },
    { teacherId: 2, disciplineId: 5 },
    { teacherId: 2, disciplineId: 6 },
  ];

  termsNumbers.forEach(async (number) => {
    await prisma.terms.upsert({
      where: { number },
      update: {},
      create: { number },
    });
  });

  categoriesExamples.forEach(async (name) => {
    await prisma.categories.upsert({
      where: { name },
      update: {},
      create: { name },
    });
  });

  disciplinesExamples.forEach(async (discipline) => {
    await prisma.disciplines.upsert({
      where: { name: discipline.name },
      update: {},
      create: discipline,
    });
  });

  teachersExamples.forEach(async (name) => {
    await prisma.teachers.upsert({
      where: { name },
      update: {},
      create: { name },
    });
  });

  teachersDisciplinesExamples.forEach(async (teacherDiscipline) => {
    await prisma.teachersDisciplines.upsert({
      where: { teacherDiscipline },
      update: {},
      create: teacherDiscipline,
    });
  });
}

main()
  .catch((e) => {
    console.log(e);
    process.exit(1);
  })
  .finally(() => {
    prisma.$disconnect();
  });
