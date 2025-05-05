export type TUser = {
    id: string,
    password: string,
    role: "admin" | "student" | "faculty",
    needsPasswordChange: boolean,
    status: "in-progress" | "blocked",
    isDeleted: boolean,
}