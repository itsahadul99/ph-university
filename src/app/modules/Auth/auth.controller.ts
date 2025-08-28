import httpStatus from 'http-status';
import { catchAsync, sendResponse } from '../../utils';
import { AuthServices } from './auth.service';
const loginUser = catchAsync(async (req, res) => {
    const result = await AuthServices.loginUser(req.body);
    sendResponse(res, {
        status: httpStatus.CREATED,
        success: true,
        message: 'Course is created successfully',
        data: result,
    });
})
const changePassword = catchAsync(async (req, res) => {
    const {...passwordData} = req.body;
    const result = await AuthServices.changePassword(req.user, passwordData);
    sendResponse(res, {
        status: httpStatus.CREATED,
        success: true,
        message: 'Password changed successfully',
        data: result,
    });
})
export const AuthControllers = {
    loginUser,
    changePassword
};