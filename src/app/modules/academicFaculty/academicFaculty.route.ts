import express from 'express';
import { validateRequest } from '../../middlewares';
import { AcademicFacultyControllers } from './academicFaculty.controller';
import { academicFacultyValidations } from './academicFaculty.validation';
const router = express.Router();

// will call controller function

router.get('/', AcademicFacultyControllers.getAllAcademicFaculties)
router.get('/:facultyId', AcademicFacultyControllers.getSingleAcademicFaculty)
router.patch('/:facultyId', validateRequest(academicFacultyValidations.updateAcademicFacultyValidationSchema), AcademicFacultyControllers.updateAcademicFaculty)
router.post('/create-academic-faculty', validateRequest(academicFacultyValidations.createAcademicFacultyValidationSchema), AcademicFacultyControllers.createAcademicFaculty)


export const AcademicFacultyRoutes = router;