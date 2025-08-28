import AppError from "../../errors/AppError";
import { TUser } from "../user/user.interface";
import { User } from "../user/user.model";
import httpStatus from "http-status";
import brcrypt from 'bcrypt';
import jwt, { JwtPayload } from 'jsonwebtoken'
import config from "../../config";
import { createToken } from "./auth.utils";
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
    const accessToken = createToken(jwtPayload, config.jwt_access_secret as string, config.jwt_access_expire_in as string)
    const refreshToken = createToken(jwtPayload, config.jwt_refresh_secret as string, config.jwt_refresh_expire_in as string)
    return {
        accessToken,
        refreshToken,
        needPasswordChange: user?.needsPasswordChange
    }
}
const changePassword = async (userData: JwtPayload, passwordData: {
    oldPassword: string,
    newPassword: string
}) => {
    // check if the user is exists
    const user = await User.isUserExistsByCustomId(userData.userId)
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
    if (! await User.isPasswordMatched(passwordData?.oldPassword, user?.password)) {
        throw new AppError(httpStatus.FORBIDDEN, "Password do not match !!")
    }

    const newHashPassword = await brcrypt.hash(passwordData.newPassword, Number(config.bcrypt_salt_rounds))
    await User.findOneAndUpdate({
        id: userData.userId,
        role: userData.role,
    }, {
        password: newHashPassword,
        needsPasswordChange: false,
        passwordChangedAt: new Date()
    })
    return null
}

const refreshToken = async (token: string) => {
    // verify the token 
    const decoded = jwt.verify(token, config.jwt_refresh_secret as string) as JwtPayload;
    const { userId, iat } = decoded;
    const user = await User.isUserExistsByCustomId(userId)
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
    // check if password changed 
    if (user.passwordChangedAt && User.isJWTIssuedBeforePasswordChanged(user?.passwordChangedAt, iat as number)) {
        throw new AppError(httpStatus.UNAUTHORIZED, "You are not authorized as time !!")
    }
    const jwtPayload = {
        userId: user?.id,
        role: user?.role
    }
    const accessToken = createToken(jwtPayload, config.jwt_access_secret as string, config.jwt_access_expire_in as string)
    return {
        accessToken,
    }
}

export const AuthServices = {
    loginUser,
    changePassword,
    refreshToken,
}