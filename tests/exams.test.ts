import supertest from "supertest";
import app from "../src/app";
import pkg from "@prisma/client";

const { PrismaClient } = pkg;

const prisma = new PrismaClient();

beforeEach(async () => {
  await prisma.$executeRaw`
    TRUNCATE tests RESTART IDENTITY 
    `;
});

describe("Testes na rota de provas", async () => {
  it.todo("Insere uma nova prova, deve retornar status 201");
  it("exemplo de como usar o supertest", async () => {
    const result = await supertest(app).get("/provas");

    expect(result.status).toBe(404);
  });
});
