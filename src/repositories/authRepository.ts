import prisma from "../database";
import { User } from "../types/userType";

export async function getUserByEmail(email: string) {
  return await prisma.users.findUnique({ where: { email } });
}

export async function getUserById(id: number) {
  return await prisma.users.findFirst({ where: { id } });
}

export async function insertUser(user: User) {
  await prisma.users.create({ data: user });
}
