import { Tests } from "@prisma/client";

export interface CreatingTest {
  name: string;
  pdfUrl: string;
  categoryId: number;
  disciplineId: number;
  teacherId: number;
}

export type Test = Omit<Tests, "id">;
