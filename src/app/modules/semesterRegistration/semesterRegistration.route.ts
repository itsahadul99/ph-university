import express from 'express';
import { SemesterRegistrationControler } from './semesterRegistration.controller';
import { validateRequest } from '../../middlewares';
import { semesterRegistrationValidation } from './semesterRegistration.validation';
const router = express.Router();
router.get('/', SemesterRegistrationControler.getAllSemesterRegistrations);
router.post('/create-semester-registration', validateRequest(semesterRegistrationValidation.createSemesterRegistrationValidationSchema), SemesterRegistrationControler.createSemesterRegistration);

export const SemesterRegistration = router;