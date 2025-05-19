import { Response } from "express";
type TResponse<T> = {
    success: boolean,
    message?: string,
    status: number,
    data: T
}
export const sendResponse = <T>(res: Response, data: TResponse<T>) => {
    return res.status(data?.status).json({
        success: data?.success,
        status: data?.status,
        message: data?.message,
        data: data?.data,
    })
}