import supertest from "supertest";
import app from "../src/app";
import pkg from "@prisma/client";
import { userFactory } from "./factories/userFactory";

const { PrismaClient } = pkg;

const prisma = new PrismaClient();

beforeEach(async () => {
  await prisma.$executeRaw`
    TRUNCATE users RESTART IDENTITY 
    `;
});

afterAll(async () => {
  await prisma.$disconnect();
});

describe("POST /sign-up", () => {
  it("Must return status 201 and create a user in database", async () => {
    const user = await userFactory();
    const result = await supertest(app).post("/sign-up").send(user);
    const dbResult = await prisma.users.findMany({
      where: { email: user.email },
    });

    expect(result.status).toBe(201);
    expect(dbResult.length).toBeGreaterThan(0);
  });

  it("Must return status 409 and do not create a second user in database", async () => {
    const user = await userFactory();
    await supertest(app).post("/sign-up").send(user);
    const result = await supertest(app).post("/sign-up").send(user);
    const dbResult = await prisma.users.findMany({ where: {} });

    expect(result.status).toBe(409);
    expect(dbResult.length).toBe(1);
  });

  it("Must return status 422 and do not create any user in database", async () => {
    const user = {};
    const result = await supertest(app).post("/sign-up").send(user);
    const dbResult = await prisma.users.findMany({ where: {} });

    expect(result.status).toBe(422);
    expect(dbResult.length).toBe(0);
  });
});

describe("POST /", () => {
  it("Must return status 200 and token length be greater than 20", async () => {
    const user = await userFactory();
    await supertest(app).post("/sign-up").send(user);
    delete user.confirmPassword;
    const result = await supertest(app).post("/").send(user);

    expect(result.status).toBe(200);
    expect(result.body.token.length).toBeGreaterThan(20);
  });

  it("Must return status 401 and do not return any token", async () => {
    const user = await userFactory();
    delete user.confirmPassword;
    const result = await supertest(app).post("/").send(user);

    expect(result.status).toBe(401);
    expect(result.body.token).toBe(undefined);
  });

  it("Must return status 422 and do not return any token", async () => {
    const user = await userFactory();
    const result = await supertest(app).post("/").send(user);

    expect(result.status).toBe(422);
    expect(result.body.token).toBe(undefined);
  });
});
