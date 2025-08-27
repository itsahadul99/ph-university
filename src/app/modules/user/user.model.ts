import { model, Schema } from "mongoose";
import brcrypt from 'bcrypt';
import config from "../../config";
import { TUser, UserModel } from "./user.interface";
const userSchema = new Schema<TUser, UserModel>({
    id: {
        type: String,
        require: true,
        unique: true,
    },
    password: {
        type: String,
        require: [true, "Password is required"],
    },
    needsPasswordChange: {
        type: Boolean,
        default: true,
    },
    role: {
        type: String,
        enum: ['admin', 'student', 'faculty'],
    },
    status: {
        type: String,
        enum: ['in-progress', 'blocked'],
        default: 'in-progress',
    },
    isDeleted: {
        type: Boolean,
        default: false,
    }
}, {
    timestamps: true,
})


// this middleware will run before saving the document to the database
userSchema.pre("save", async function (next) {
    const student = this; // this will refer to the current document
    student.password = await brcrypt.hash(student.password, Number(config.bcrypt_salt_rounds));
    next()
})

// this middleware will run after saving the document to the database
userSchema.post("save", function (doc, next) {
    doc.password = '';
    next()
})

userSchema.statics.isUserExistsByCustomId = async function (id: string) {
    return await User.findOne({
        id
    })
}

userSchema.statics.isPasswordMatched = async function (plainTextPassword: string, hassPassword: string) {
    return await brcrypt.compare(plainTextPassword, hassPassword)
}

export const User = model<TUser, UserModel>('User', userSchema)