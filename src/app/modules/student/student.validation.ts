import { z } from 'zod';
const userNameValidationSchema = z.object({
  firstName: z
    .string()
    .min(1)
    .max(20)
    .refine((value) => /^[A-Z]/.test(value), {
      message: 'First Name must start with a capital letter',
    }),
  middleName: z.string(),
  lastName: z.string(),
});
// 🧠 Optional version for updates
const userNameOptionalSchema = z.object({
  firstName: z
    .string()
    .min(1)
    .max(20)
    .refine((value) => /^[A-Z]/.test(value), {
      message: 'First Name must start with a capital letter',
    })
    .optional(),
  middleName: z.string().optional(),
  lastName: z.string().optional(),
});

const guardianValidationSchema = z.object({
  fatherName: z.string(),
  fatherOccupation: z.string(),
  fatherContactNo: z.string(),
  motherName: z.string(),
  motherOccupation: z.string(),
  motherContactNo: z.string(),
});

const localGuardianValidationSchema = z.object({
  name: z.string(),
  occupation: z.string(),
  contactNo: z.string(),
  address: z.string(),
});

export const createStudentValidationSchema = z.object({
  body: z.object({
    password: z.string().max(20),
    student: z.object({
      name: userNameValidationSchema,
      gender: z.enum(['male', 'female', 'other']),
      dateOfBirth: z.string().optional(),
      email: z.string().email(),
      contactNo: z.string(),
      emergencyContactNo: z.string(),
      bloogGroup: z.enum(['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-']),
      presentAddress: z.string(),
      permanentAddress: z.string(),
      guardian: guardianValidationSchema,
      localGuardian: localGuardianValidationSchema,
      admissionSemester: z.string(),
      academicDepartment: z.string(),
      profileImg: z.string(),
    }),
  }),
});

const updateStudentInfoValidationSchema = z.object({
  body: z.object({
    student: z.object({
      name: userNameOptionalSchema.optional(),
      gender: z.enum(['male', 'female', 'others']).optional(),
      dateOfBirth: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, 'Must be in YYYY-MM-DD').optional(),
      email: z.string().email().optional(),
      contactNo: z.string().regex(/^\d{11}$/, 'Must be 11 digits').optional(),
      emergencyContactNo: z.string().regex(/^\d{11}$/, 'Must be 11 digits').optional(),
      bloodGroup: z.enum(['A-', 'A+', 'B-', 'B+', 'AB+', 'AB-', 'O+', 'O-']).optional(),
      presentAddress: z.string().min(5).optional(),
      permanentAddress: z.string().min(5).optional(),
      guardian: guardianValidationSchema.optional(),
      profileImg: z.string().url().regex(/\.(jpg|jpeg|png|webp)$/).optional(),
      isActive: z.enum(['active', 'blocked']).optional()
    })
  })
})

const updatePasswordValidation = z.object({
  oldPassword: z.string().min(6).max(20),
  newPassword: z.string().min(6).max(20)
});


export const studentValidations = {
  createStudentValidationSchema,
  updateStudentInfoValidationSchema,
  updatePasswordValidation
}
