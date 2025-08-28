import express from "express";
import { auth, validateRequest } from "../../middlewares";
import { AuthValidation } from "./auth.validation";
import { AuthControllers } from "./auth.controller";
import { USER_ROLE } from "../user/user.constant";
const router = express.Router();
router.post('/login', validateRequest(AuthValidation.loginValidationSchema), AuthControllers.loginUser);
router.post('/change-password', auth(USER_ROLE.admin, USER_ROLE.faculty, USER_ROLE.student), validateRequest(AuthValidation.changePasswordValidationSchema), AuthControllers.changePassword);
router.post('/refresh-token', validateRequest(AuthValidation.refreshTokenValidationSchema), AuthControllers.refreshToken);
router.post('/forget-password', validateRequest(AuthValidation.forgetPasswordValidationSchema), AuthControllers.forgetPassword);
router.post('/resset-password', validateRequest(AuthValidation.ressetPasswordValidationSchema), AuthControllers.ressetPassword);

export const AuthRoutes = router;