import express from 'express';
import { StudentControllers } from './student.controller';


const router = express.Router();

// will call controller function
router.get('/', StudentControllers.getAllStudents)
router.post('/create-student', StudentControllers.createStudent)
router.get('/:studentId', StudentControllers.getSingleStudent)
// update student info
router.patch("/:studentId", StudentControllers.updateStudentInfo)
router.delete('/:studentId', StudentControllers.deleteStudent)
export const StudentRoutes = router;