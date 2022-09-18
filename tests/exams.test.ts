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

afterAll(() => {
  prisma.$disconnect();
});

describe("Testes na rota de provas", () => {
  it.todo("Insere uma nova prova, deve retornar status 201");
  it("exemplo de como usar o supertest", async () => {
    // const result = await supertest(app).get("/provas");

    expect(2 + 2).toBe(4);
  });
});

describe("test /sign-up", () => {
  it("POST /sign-up", async () => {
    const user = {
      email: "xablau@xablau.com",
      password: "Repoprovas123",
      confirmPassword: "Repoprovas123",
    };
    const result = await supertest(app).post("/sign-up").send(user);

    expect(result.status).toBe(201);
  });
});
