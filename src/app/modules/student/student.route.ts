import express from 'express';
import { StudentControllers } from './student.controller';
import { validateRequest } from '../../middlewares';
import { studentValidations } from './student.validation';


const router = express.Router();

// will call controller function
router.get('/', StudentControllers.getAllStudents)
router.get('/:studentId', StudentControllers.getSingleStudent)
// update student info
router.patch("/:studentId", validateRequest(studentValidations.updateStudentInfoValidationSchema), StudentControllers.updateStudentInfo)
router.delete('/:studentId', StudentControllers.deleteStudent)
export const StudentRoutes = router;