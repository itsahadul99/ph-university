// import { model, Schema } from 'mongoose';
// import { Guardian, Student, UserName } from './student.interface';

// const userNameSchema = new Schema<UserName>({
//     fistName: {
//         type: String,
//         required: [true, 'First name is required'],
//         trim: true,
//         minlength: [2, 'First name must be at least 2 characters'],
//         maxlength: [50, 'First name must be at most 50 characters']
//     },
//     middleName: {
//         type: String,
//         trim: true,
//         maxlength: [50, 'Middle name must be at most 50 characters']
//     },
//     lastName: {
//         type: String,
//         required: [true, 'Last name is required'],
//         trim: true,
//         minlength: [2, 'Last name must be at least 2 characters'],
//         maxlength: [50, 'Last name must be at most 50 characters']
//     }
// });

// const guardianSchema = new Schema<Guardian>({
//     guardianName: {
//         type: String,
//         required: [true, 'Guardian name is required'],
//         trim: true,
//         minlength: [2, 'Guardian name must be at least 2 characters'],
//         maxlength: [100, 'Guardian name must be at most 100 characters']
//     },
//     guardianOccupation: {
//         type: String,
//         required: [true, 'Guardian occupation is required'],
//         trim: true,
//         maxlength: [100, 'Guardian occupation must be at most 100 characters']
//     },
//     relationBetweenGuardian: {
//         type: String,
//         enum: {
//             values: ['Father', 'Mother', 'Brother', 'Uncle', 'Others'],
//             message: 'Relation must be one of: Father, Mother, Brother, Uncle, Others'
//         },
//         required: [true, 'Guardian relation is required']
//     }
// });

// const studentSchema = new Schema<Student>({
//     id: {
//         type: String,
//         required: [true, 'Student ID is required'],
//         unique: true,
//         trim: true
//     },
//     name: {
//         type: userNameSchema,
//         required: true
//     },
//     gender: {
//         type: String,
//         enum: {
//             values: ['male', 'female', 'others'],
//             message: "Gender must be either 'male', 'female', or 'others'"
//         },
//         required: [true, 'Gender is required']
//     },
//     dateOfBirth: {
//         type: String,
//         match: [/^\d{4}-\d{2}-\d{2}$/, 'Date of Birth must be in YYYY-MM-DD format']
//     },
//     email: {
//         type: String,
//         required: [true, 'Email is required'],
//         unique: true,
//         trim: true,
//         lowercase: true,
//         match: [/.+\@.+\..+/, 'Email must be valid']
//     },
//     contactNo: {
//         type: String,
//         required: [true, 'Contact number is required'],
//         match: [/^\d{11}$/, 'Contact number must be 11 digits']
//     },
//     emergencyContactNo: {
//         type: String,
//         required: [true, 'Emergency contact number is required'],
//         match: [/^\d{11}$/, 'Emergency contact number must be 11 digits']
//     },
//     bloodGroup: {
//         type: String,
//         enum: {
//             values: ['A-', 'A+', 'B-', 'B+', 'AB+', 'AB-', 'O+', 'O-'],
//             message: 'Blood group must be a valid type like A+, B-, etc.'
//         }
//     },
//     presentAddress: {
//         type: String,
//         required: [true, 'Present address is required'],
//         trim: true,
//         minlength: [5, 'Present address must be at least 5 characters']
//     },
//     permanentAddress: {
//         type: String,
//         required: [true, 'Permanent address is required'],
//         trim: true,
//         minlength: [5, 'Permanent address must be at least 5 characters']
//     },
//     guardian: {
//         type: guardianSchema,
//         required: true
//     },
//     profileImg: {
//         type: String,
//         match: [/^https?:\/\/.+\.(jpg|jpeg|png|webp)$/, 'Profile image must be a valid image URL']
//     },
//     isActive: {
//         type: String,
//         enum: {
//             values: ['active', 'blocked'],
//             message: "isActive must be either 'active' or 'blocked'"
//         },
//         default: 'active'
//     }
// });

// const StudentModel = model<Student>('Student', studentSchema);
// export default StudentModel;


// USING ZOD VALIDATION SCHEMA SO NO NEED TO VALIDATE HERE
import { model, Schema } from 'mongoose';
import { StudentModel, TGuardian, TStudent, TUserName } from './student.interface';
import brcrypt from 'bcrypt';
import config from '../..';
const userNameSchema = new Schema<TUserName>({
  fistName: { type: String, required: true, },
  middleName: { type: String },
  lastName: { type: String, required: true }
});

const guardianSchema = new Schema<TGuardian>({
  guardianName: { type: String, required: true },
  guardianOccupation: { type: String, required: true },
  relationBetweenGuardian: { type: String, required: true }
});

const studentSchema = new Schema<TStudent, StudentModel>({ // for instance method pass 3 parameter TStudent, StudentModel, StudentMethods. for static method pass 2 parameter TStudent, StudentModel
  id: { type: String, unique: true },
  password: { type: String, required: true },
  name: {
    type: userNameSchema,
    required: true,
  },
  gender: {
    type: String,
    enum: ['male', 'female', 'others'],
    required: true,
  },
  dateOfBirth: { type: String, required: true },
  email: { type: String, unique: true, lowercase: true },
  contactNo: { type: String, required: true },
  emergencyContactNo: { type: String, required: true },
  bloodGroup: { type: String, required: true },
  presentAddress: { type: String, required: true },
  permanentAddress: { type: String, required: true },
  guardian: guardianSchema,
  profileImg: { type: String },
  isActive: { type: String, default: 'active' },
  isDeleted: { type: Boolean, default: false },
});


// MIDDLEWARE / HOOK

// this middleware will run before saving the document to the database
studentSchema.pre("save", async function (next) {
  const student = this; // this will refer to the current document
  student.password = await brcrypt.hash(student.password, Number(config.bcrypt_salt_rounds));
  next()
})

// this middleware will run after saving the document to the database
studentSchema.post("save", function (doc, next) {
  doc.password = '';
  next()
})
// Query middleware 

studentSchema.pre("find", function (next) {
  this.find({ isDeleted: { $ne: true } }) // this will refer to the current query
  next()
})
studentSchema.pre("findOne", function (next) {
  this.find({ isDeleted: { $ne: true } }) // this will refer to the current query
  next()
})

studentSchema.pre("aggregate", function (next) {
  this.pipeline().unshift({ $match: { isDeleted: { $ne: true } } }) // this will refer to the current query
  next()
})

// check if the student is deleted or not if deleted then we are not going to update the student info
studentSchema.pre('updateOne', async function (next) {
    const query = this.getQuery();
    const student = await this.model.findOne(query); // value asbe || null asbe
    if (!student) {
      return next(new Error("Student not found"));
    }
    next();
});

// CUSTOM INSTANCE METHOD TO CHECK IF USER EXIST OR NOT

// studentSchema.methods.isUserExist = async function (id: string) {
//   const result = await Student.findOne({ id });
//   return result;
// }


// CUSTOM STATIC METHOD TO CHECK IF USER EXIST OR NOT
studentSchema.statics.isUserExist = async function (id: string) {
  const result = await this.findOne({ id });
  return result;
}
const Student = model<TStudent, StudentModel>('Student', studentSchema);
export default Student;
