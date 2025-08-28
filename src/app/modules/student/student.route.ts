import express from 'express';
import { StudentControllers } from './student.controller';
import { auth, validateRequest } from '../../middlewares';
import { studentValidations } from './student.validation';
import { USER_ROLE } from '../user/user.constant';


const router = express.Router();

// will call controller function
router.get('/', StudentControllers.getAllStudents)
router.get('/:id', auth(USER_ROLE.admin, USER_ROLE.faculty), StudentControllers.getSingleStudent)
// update student info
router.patch("/:id", validateRequest(studentValidations.updateStudentInfoValidationSchema), StudentControllers.updateStudentInfo)
router.delete('/:id', StudentControllers.deleteStudent)
export const StudentRoutes = router;