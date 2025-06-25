import express from 'express';
import { validateRequest } from '../../middlewares';
import { AcademicDepartmentControllers } from './academicDepartment.controller';
import { academicDepartmentValidtions } from './academicDepartment.validation';
const router = express.Router();

// will call controller function

router.get('/', AcademicDepartmentControllers.getAllAcademicDepartments)
router.get('/:academicDepartmentId', AcademicDepartmentControllers.getSingleAcademicDepartment)
router.patch('/:academicDepartmentId', validateRequest(academicDepartmentValidtions.updateAcademicDepartmentValidationSchema), AcademicDepartmentControllers.updateAcademicDepartment)
router.post('/create-academic-department', validateRequest(academicDepartmentValidtions.createAcademicDepartmentValidationSchema), AcademicDepartmentControllers.createAcademicDepartment)


export const AcademicDepartmentRoutes = router;