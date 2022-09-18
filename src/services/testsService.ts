import { getTeacherDiscipline } from "../repositories/teachersDisciplinesRepository";
import {
  getAllTestsGroupByDiscipline,
  getAllTestsGroupByTeacher,
  getDisciplineById,
  getTeacherById,
  insertNewTest,
} from "../repositories/testsRepository";
import { CreatingTest, Test } from "../types/testTypes";

export async function createTest(test: CreatingTest) {
  const teacher = await getTeacherById(test.teacherId);
  if (!teacher) {
    throw { type: "notFound", message: "Teacher not found" };
  }
  const discipline = await getDisciplineById(test.disciplineId);
  if (!discipline) {
    throw { type: "notFound", message: "Discipline not found" };
  }
  const teacherDiscipline = {
    disciplineId: test.disciplineId,
    teacherId: test.teacherId,
  };
  const dbTeacherDiscipline = await getTeacherDiscipline(teacherDiscipline);
  if (!dbTeacherDiscipline) {
    throw {
      type: "notFound",
      message: "This teacher does not teach this discipline",
    };
  }
  const newTest: Test = {
    name: test.name,
    pdfUrl: test.pdfUrl,
    categoryId: test.categoryId,
    teacherDisciplineId: dbTeacherDiscipline.id,
  };
  await insertNewTest(newTest);
  return newTest;
}

export async function getTestsGroupByDiscipline() {
  return await getAllTestsGroupByDiscipline();
}

export async function getTestsGroupByTeacher() {
  return await getAllTestsGroupByTeacher();
}
