import httpStatus from 'http-status';
import { catchAsync, sendResponse } from '../../utils';
import { AuthServices } from './auth.service';
import config from '../../config';
const loginUser = catchAsync(async (req, res) => {
    const result = await AuthServices.loginUser(req.body);
    const { accessToken, refreshToken, needPasswordChange } = result;
    res.cookie("refreshToken", refreshToken, {
        secure: config.env === "production",
        httpOnly: true
    })
    sendResponse(res, {
        status: httpStatus.CREATED,
        success: true,
        message: 'Course is created successfully',
        data: {
            accessToken,
            needPasswordChange
        },
    });
})
const changePassword = catchAsync(async (req, res) => {
    const { ...passwordData } = req.body;
    const result = await AuthServices.changePassword(req.user, passwordData);
    sendResponse(res, {
        status: httpStatus.CREATED,
        success: true,
        message: 'Password changed successfully',
        data: result,
    });
})

const refreshToken = catchAsync(async (req, res) => {
    const {refreshToken} = req.cookies;
    const result = await AuthServices.refreshToken(refreshToken);
    sendResponse(res, {
        status: httpStatus.CREATED,
        success: true,
        message: 'Access token retrived successfully',
        data: result
    });
})
const forgetPassword = catchAsync(async (req, res) => {
    const {id} = req.body
    const result = await AuthServices.forgetPassword(id);
    sendResponse(res, {
        status: httpStatus.CREATED,
        success: true,
        message: 'Reset link is generated successfully !!',
        data: result
    });
})
export const AuthControllers = {
    loginUser,
    changePassword,
    refreshToken,
    forgetPassword
};