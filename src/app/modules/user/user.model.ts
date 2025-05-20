import { model, Schema } from "mongoose";
import { TUser } from "./user.interface";
import brcrypt from 'bcrypt';
import config from "../../config";
const userSchema = new Schema<TUser>({
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

export const User = model<TUser>('User', userSchema)