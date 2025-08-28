import { model, Schema } from "mongoose";
import brcrypt from 'bcrypt';
import config from "../../config";
import { TUser, UserModel } from "./user.interface";
import { UserStatus } from "./user.constant";
const userSchema = new Schema<TUser, UserModel>({
    id: {
        type: String,
        require: true,
        unique: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        require: [true, "Password is required"],
        select: 0
    },
    passwordChangedAt: {
        type: Date,
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
        enum: UserStatus,
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
    }).select("+password")
}

userSchema.statics.isPasswordMatched = async function (plainTextPassword: string, hassPassword: string) {
    return await brcrypt.compare(plainTextPassword, hassPassword)
}
userSchema.statics.isJWTIssuedBeforePasswordChanged = function (passwordChangedTimestamp: Date, jwtIsssuedTimestamp: number){
    const passwordChangedAt = new Date(passwordChangedTimestamp).getTime() / 1000;
    return passwordChangedAt > jwtIsssuedTimestamp;
}

export const User = model<TUser, UserModel>('User', userSchema)