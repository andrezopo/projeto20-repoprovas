import supertest from "supertest";
import app from "../src/app";
import pkg from "@prisma/client";
import { testFactory } from "./factories/testFactory";
import { userFactory } from "./factories/userFactory";

const { PrismaClient } = pkg;

const prisma = new PrismaClient();

beforeEach(async () => {
  await prisma.$executeRaw`
    TRUNCATE tests RESTART IDENTITY 
    `;
});

afterAll(async () => {
  await prisma.$disconnect();
});

describe("POST /tests", () => {
  it("Must return status 201 and create a test in database", async () => {
    const test = await testFactory();
    const user = await userFactory();
    await supertest(app).post("/sign-up").send(user);
    delete user.confirmPassword;
    const data = await supertest(app).post("/").send(user);
    const result = await supertest(app)
      .post("/tests")
      .send(test)
      .set("Authorization", "Bearer " + data.body.token);
    const dbResult = await prisma.tests.findMany({ where: {} });

    expect(result.status).toBe(201);
    expect(dbResult[0]).toEqual(result.body);
  });
});
