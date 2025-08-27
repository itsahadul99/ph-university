import AppError from "../../errors/AppError";
import { TUser } from "../user/user.interface";
import { User } from "../user/user.model";
import httpStatus from "http-status";
import brcrypt from 'bcrypt';
import jwt from 'jsonwebtoken'
import config from "../../config";
const loginUser = async (payload: TUser) => {
    // check if the user is exists
    const user = await User.isUserExistsByCustomId(payload.id)
    if (!user) {
        throw new AppError(httpStatus.NOT_FOUND, "Invalid credentials !!")
    }
    // check the if user already deleted
    if (user?.isDeleted) {
        throw new AppError(httpStatus.FORBIDDEN, "This user is deleted !!")
    }
    // user status
    if (user?.status === "blocked") {
        throw new AppError(httpStatus.FORBIDDEN, "This user is blocked !!")
    }
    // // check the password
    if (! await User.isPasswordMatched(payload?.password, user?.password)) {
        throw new AppError(httpStatus.FORBIDDEN, "Password do not match !!")
    }
    const jwtPayload = {
        userId: user?.id,
        role: user?.role
    }
    // create token and sent to the client
    const accessToken = jwt.sign(jwtPayload, config.jwt_access_secret as string, {expiresIn: "10d"})
    return {
        accessToken,
        needPasswordChange: user?.needsPasswordChange
    }
}
export const AuthServices = {
    loginUser,
}