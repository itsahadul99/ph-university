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
export const AuthControllers = {
    loginUser,
};