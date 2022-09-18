import { TeachersDisciplines } from "@prisma/client";

export type TeacherDiscipline = Omit<TeachersDisciplines, "id">;
