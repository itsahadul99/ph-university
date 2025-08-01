import { Types } from "mongoose";

export type TPreRequisiteCourses = {
    couse: Types.ObjectId;
    isDeleted: boolean;
}

export type TCourse = {
    title: string;
    code: number;
    prefix: string;
    credit: number;
    preQequisiteCourses?: TPreRequisiteCourses[];
}