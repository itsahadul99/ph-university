export type UserName = {
    fistName: string,
    middleName?: string,
    lastName: string,
}
export type Guardian = {
    guardianName: string,
    guardianOccupation: string,
    relationBetweenGuardian: "Father" | "Mother" | "Brother" | "Uncle" | "Others"
}
export type Student = {
    id: string,
    name: UserName,
    gender: "male" | "female" | "others",
    email: string,
    dateOfBirth: string,
    contactNo: string,
    emergencyContactNo: string,
    bloodGroup?: "A-" | "A+" | "B-" | "B+" | "AB+" | "AB-" | "O+" | "O-",
    presentAddress: string,
    permanentAddress: string,
    guardian: Guardian,
    profileImg?: string,
    isActive: "active" | "blocked";
}

