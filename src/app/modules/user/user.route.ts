import express from 'express';
import { UserControllers } from './user.controller';
import { auth, validateRequest } from '../../middlewares';
import { studentValidations } from '../student/student.validation';
import { facultyValidations } from '../faculty/faculty.validation';
import { adminValidations } from '../admin/admin.validation';
import { USER_ROLE } from './user.constant';
import { userValidation } from './user.validation';

const router = express.Router();

// will call controller function
router.post('/create-student', auth(USER_ROLE.admin), validateRequest(studentValidations.createStudentValidationSchema), UserControllers.createStudent)
router.post('/create-faculty', validateRequest(facultyValidations.createFacultyValidationSchema), UserControllers.createFaculty);
router.post('/create-admin', validateRequest(adminValidations.createAdminValidationSchema), UserControllers.createAdmin);
router.get('/me', auth(USER_ROLE.admin, USER_ROLE.faculty, USER_ROLE.student), UserControllers.getMe);
router.post('/change-status/:id', auth(USER_ROLE.admin, USER_ROLE.faculty),validateRequest(userValidation.changeStatusValidationSchema),  UserControllers.changeStatus);
export const UserRoutes = router;
