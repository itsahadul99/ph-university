import express from 'express';
import { UserControllers } from './user.controller';
import { validateRequest } from '../../middlewares';
import { studentValidations } from '../student/student.validation';



const router = express.Router();

// will call controller function
router.post('/create-student', validateRequest(studentValidations.createStudentValidationSchema), UserControllers.createStudent)
export const UserRoutes = router;
