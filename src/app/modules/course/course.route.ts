import express from 'express';
import { validateRequest } from '../../middlewares';
import { CourseControllers } from './course.controller';
import { CourseValidation } from './course.validation';

const router = express.Router();

router.post(
  '/create-course',
  validateRequest(CourseValidation.createCourseValidationSchema),
  CourseControllers.createCourse,
);
router.patch(
  '/:id',
  validateRequest(CourseValidation.updateCourseValidationSchema),
  CourseControllers.updateCourse,
);
router.get('/', CourseControllers.getAllCourses);
router.get('/:id', CourseControllers.getSingleCourse);
router.delete('/:id', CourseControllers.deleteCourse);

export const CourseRoute = router;