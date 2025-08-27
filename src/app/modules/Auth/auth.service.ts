import AppError from "../../errors/AppError";
import { TUser } from "../user/user.interface";
import { User } from "../user/user.model";
import httpStatus from "http-status";
import brcrypt from 'bcrypt';
const loginUser = async (payload: TUser) => {
    // check if the user is exists
    const user = await User.isUserExistsByCustomId(payload.id)
    if (!user) {
        throw new AppError(httpStatus.NOT_FOUND, "Invalid credentials !!")
    }
    // check the if user already deleted
    // const isDeletedUser = isUserExists.isDeleted;
    // if (isDeletedUser) {
    //     throw new AppError(httpStatus.FORBIDDEN, "This user is deleted !!")
    // }
    // // user status
    // const userStatus = isUserExists?.status;
    // if (userStatus === "blocked") {
    //     throw new AppError(httpStatus.FORBIDDEN, "This user is blocked !!")
    // }
    // // check the password
    if(! await User.isPasswordMatched(payload?.password, user?.password)){
        throw new AppError(httpStatus.FORBIDDEN, "Password do not match !!")
    }
    // const isPasswordMatched = await brcrypt.compare(payload.password, isUserExists?.password)
    // access granted. send access token / refresh token 
    return {}
}
export const AuthServices = {
    loginUser,
}