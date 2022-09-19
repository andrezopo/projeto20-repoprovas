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

  it("Must return status 401 and do not create any test in database", async () => {
    const test = await testFactory();
    const result = await supertest(app)
      .post("/tests")
      .send(test)
      .set("Authorization", "Bearer hsuahsuahsuahsuahsuahsuhaushausha");
    const dbResult = await prisma.tests.findMany({ where: {} });

    expect(result.status).toBe(401);
    expect(dbResult.length).toBe(0);
  });

  it("Must return status 422 for not sending token and do not create any test in database", async () => {
    const test = await testFactory();
    const result = await supertest(app).post("/tests").send(test);
    const dbResult = await prisma.tests.findMany({ where: {} });

    expect(result.status).toBe(422);
    expect(dbResult.length).toBe(0);
  });

  it("Must return 422 for sending wrong test schema and do not create any test in database", async () => {
    const test = {};
    const result = await supertest(app).post("/tests").send(test);
    const dbResult = await prisma.tests.findMany({ where: {} });

    expect(result.status).toBe(422);
    expect(dbResult.length).toBe(0);
  });
});

describe("GET /tests/disciplines", () => {
  it("Must return status 200 and return not empty array", async () => {
    const test = await testFactory();
    const user = await userFactory();
    await supertest(app).post("/sign-up").send(user);
    delete user.confirmPassword;
    const data = await supertest(app).post("/").send(user);
    await supertest(app)
      .post("/tests")
      .send(test)
      .set("Authorization", "Bearer " + data.body.token);
    const result = await supertest(app)
      .get("/tests/disciplines")
      .set("Authorization", "Bearer " + data.body.token);

    expect(result.status).toBe(200);
    expect(result.body.length).toBeGreaterThan(0);
  });

  it("Must return 422 for not sending token", async () => {
    const result = await supertest(app).get("/tests/disciplines");

    expect(result.status).toBe(422);
  });

  it("Must return 401 for sending wrong token", async () => {
    const result = await supertest(app)
      .get("/tests/disciplines")
      .set("Authorization", "Bearer kosaksoaksokaoskasokas");

    expect(result.status).toBe(401);
  });
});

describe("GET /tests/teachers", () => {
  it("Must return status 200 and return not empty array", async () => {
    const test = await testFactory();
    const user = await userFactory();
    await supertest(app).post("/sign-up").send(user);
    delete user.confirmPassword;
    const data = await supertest(app).post("/").send(user);
    await supertest(app)
      .post("/tests")
      .send(test)
      .set("Authorization", "Bearer " + data.body.token);
    const result = await supertest(app)
      .get("/tests/teachers")
      .set("Authorization", "Bearer " + data.body.token);

    expect(result.status).toBe(200);
    expect(result.body.length).toBeGreaterThan(0);
  });

  it("Must return 422 for not sending token", async () => {
    const result = await supertest(app).get("/tests/teachers");

    expect(result.status).toBe(422);
  });

  it("Must return 401 for sending wrong token", async () => {
    const result = await supertest(app)
      .get("/tests/teachers")
      .set("Authorization", "Bearer zzzzzzzzzzzzzzzzzzzzzz");

    expect(result.status).toBe(401);
  });
});
