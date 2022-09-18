import prisma from "../database";
import { TeacherDiscipline } from "../types/teacherDisciplineType";

export async function getTeacherDiscipline(
  teacherDiscipline: TeacherDiscipline
) {
  return await prisma.teachersDisciplines.findUnique({
    where: { teacherDiscipline },
  });
}
