import { z } from 'zod';

export const nameValidationSchema = z.object({
  fistName: z.string().min(2).max(50),
  middleName: z.string().max(50).optional(),
  lastName: z.string().min(2).max(50)
});

export const guardianValidationSchema = z.object({
  guardianName: z.string().min(2).max(100),
  guardianOccupation: z.string().max(100),
  relationBetweenGuardian: z.enum(['Father', 'Mother', 'Brother', 'Uncle', 'Others'])
});

export const studentValidationSchema = z.object({
  id: z.string(),
  name: nameValidationSchema,
  gender: z.enum(['male', 'female', 'others']),
  dateOfBirth: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, 'Must be in YYYY-MM-DD'),
  email: z.string().email(),
  contactNo: z.string().regex(/^\d{11}$/, 'Must be 11 digits'),
  emergencyContactNo: z.string().regex(/^\d{11}$/, 'Must be 11 digits'),
  bloodGroup: z.enum(['A-', 'A+', 'B-', 'B+', 'AB+', 'AB-', 'O+', 'O-']).optional(),
  presentAddress: z.string().min(5),
  permanentAddress: z.string().min(5),
  guardian: guardianValidationSchema,
  profileImg: z.string().url().regex(/\.(jpg|jpeg|png|webp)$/).optional(),
  isActive: z.enum(['active', 'blocked'])
});
