import { model, Schema } from 'mongoose';
import { Guardian, Student, UserName } from './student.interface';
const userNameSchema = new Schema<UserName>({
    fistName: {
        type: String,
        require: true,
    },
    middleName: {
        type: String
    },
    lastName: {
        type: String,
        require: true
    }
})
const guardianSchema = new Schema<Guardian>({
    guardianName: {
        type: String,
        required: true,
    },
    guardianOccupation: {
        type: String,
        required: true,
    },
    relationBetweenGuardian: ["Father", "Mother", "Brother", "Uncle", "Others"]
})
const studentSchema = new Schema<Student>({
    id: { type: String },
    name: userNameSchema,
    gender: ["male", "female"],
    dateOfBirth: {
        type: String
    },
    email: {
        type: String,
        required: true
    },
    contactNo: {
        type: String,
        required: true,
    },
    emergencyContactNo: {
        type: String,
        required: true
    },
    bloodGroup: ["A-", "A+", "B-", "B+", "AB+", "AB-", "O+", "O-"],
    presentAddress: {
        type: String,
        required: true,
    },
    permanentAddress: {
        type: String,
        required: true,
    },
    guardian: guardianSchema,
    profileImg: {
        type: String,
    },
    isActive: ["active", "blocked"]
})

const StudentModel = model<Student>("Student", studentSchema)

export default StudentModel;