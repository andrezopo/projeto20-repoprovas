import { Users } from "@prisma/client";

export type User = Omit<Users, "id">;

interface SignUpUser extends Users {
  confirmPassword: string;
}

export type SignUp = Omit<SignUpUser, "id">;
