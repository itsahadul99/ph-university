import { Model } from "mongoose";

export interface TUser {
  id: string,
  password: string,
  role: "admin" | "student" | "faculty",
  needsPasswordChange: boolean,
  status: "in-progress" | "blocked",
  isDeleted: boolean,
}

export interface UserModel extends Model<TUser> {
  // myStaticMethod(): number;
  isUserExistsByCustomId(id: string): Promise<TUser>;
  isPasswordMatched(plainTextPassword: string, hassPassword: string): Promise<boolean>
}