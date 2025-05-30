import express from 'express';
import { AcademicSemesterControllers } from './academicSemester.controller';
import { validateRequest } from '../../middlewares';
import { academicSemesterValidations } from './academicSemester.validation';
const router = express.Router();

// will call controller function

router.get('/all-semester', AcademicSemesterControllers.getAcademicSemester)
router.post('/create-academic-semester', validateRequest(academicSemesterValidations.createAcademicSemesterValidationSchema), AcademicSemesterControllers.createAcademicSemester)


export const AcademicSemesterRoutes = router;