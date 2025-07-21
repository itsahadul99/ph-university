import express from 'express';
import { UserControllers } from './user.controller';
import { validateRequest } from '../../middlewares';
import { studentValidations } from '../student/student.validation';
import { facultyValidations } from '../faculty/faculty.validation';



const router = express.Router();

// will call controller function
router.post('/create-student', validateRequest(studentValidations.createStudentValidationSchema), UserControllers.createStudent)
router.post('/create-faculty', validateRequest(facultyValidations.createFacultyValidationSchema), UserControllers.createFaculty);
export const UserRoutes = router;
