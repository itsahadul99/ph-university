import { Model } from "mongoose";
import { USER_ROLE } from "./user.constant";

export interface TUser {
  id: string,
  password: string,
  passwordChangedAt?: Date,
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


export type TUserRole = keyof typeof USER_ROLE;