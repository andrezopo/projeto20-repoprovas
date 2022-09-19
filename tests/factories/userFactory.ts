import { faker } from "@faker-js/faker";
import { SignUp } from "../../src/types/userType";

export async function userFactory() {
  const password = faker.internet.password();
  const user: SignUp = {
    email: faker.internet.email(),
    password,
    confirmPassword: password,
  };
  return user;
}
