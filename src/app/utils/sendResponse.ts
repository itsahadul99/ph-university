/**
 * The function `sendResponse` sends a response with a specific structure using Express in TypeScript.
 * @param {Response} res - The `res` parameter in the `sendResponse` function is of type `Response`,
 * which is imported from the "express" library. It represents the response object that will be sent
 * back to the client in an Express.js application.
 * @param data - The `data` parameter in the `sendResponse` function is of type `TResponse<T>`, which
 * is a generic type that represents a response object containing the following properties:
 * @returns The `sendResponse` function is returning a JSON response with the properties `success`,
 * `status`, `message`, and `data` extracted from the `TResponse` object passed as the `data`
 * parameter. The HTTP status of the response is set based on the `status` property of the `TResponse`
 * object.
 */
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