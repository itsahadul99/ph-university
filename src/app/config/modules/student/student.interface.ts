import { Model } from "mongoose";

export type TUserName = {
    fistName: string,
    middleName?: string,
    lastName: string,
}
export type TGuardian = {
    guardianName: string,
    guardianOccupation: string,
    relationBetweenGuardian: "Father" | "Mother" | "Brother" | "Uncle" | "Others"
}
export type TStudent = {
    id: string,
    password: string,
    name: TUserName,
    gender: "male" | "female" | "others",
    email: string,
    dateOfBirth: string,
    contactNo: string,
    emergencyContactNo: string,
    bloodGroup?: "A-" | "A+" | "B-" | "B+" | "AB+" | "AB-" | "O+" | "O-",
    presentAddress: string,
    permanentAddress: string,
    guardian: TGuardian,
    profileImg?: string,
    isActive: "active" | "blocked";
}


// creating a custom interface for student model to check the existing user

// export type StudentMethods = {
//     isUserExist(id: string): Promise<TStudent | null>;
// }
// export type StudentModel = Model<TStudent, Record<string, never>, StudentMethods>

// creating a custom static method for student model to check the existing user
export interface StudentModel extends Model<TStudent> {
    isUserExist(id: string): Promise<TStudent | null>;
}