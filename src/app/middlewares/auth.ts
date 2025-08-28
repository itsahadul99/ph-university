import { NextFunction, Request, Response } from "express";
import { catchAsync } from "../utils";
import AppError from "../errors/AppError";
import httpStatus from 'http-status'
import jwt, { JwtPayload } from 'jsonwebtoken'
import config from "../config";
import { TUserRole } from "../modules/user/user.interface";
import { User } from "../modules/user/user.model";
export const auth = (...requiredRoles: TUserRole[]) => {
    return catchAsync(async (req: Request, res: Response, next: NextFunction) => {
        const token = req.headers?.authorization;
        // check if token
        if (!token) {
            throw new AppError(httpStatus.UNAUTHORIZED, "You are not authorized !!")
        }
        // verify the token 
        const decoded = jwt.verify(token, config.jwt_access_secret as string) as JwtPayload;
        const { role, userId, iat } = decoded;

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

        if (requiredRoles && !requiredRoles.includes(role)) {
            throw new AppError(httpStatus.UNAUTHORIZED, "You are not authorized !!")
        }

        // check if password changed 
        if (user.passwordChangedAt && User.isJWTIssuedBeforePasswordChanged(user?.passwordChangedAt, iat as number)) {
            throw new AppError(httpStatus.UNAUTHORIZED, "You are not authorized as time !!")
        }
        req.user = decoded as JwtPayload;
        next()
    })
}