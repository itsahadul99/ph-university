/**
 * The function `handleDuplicateError` processes a duplicate field error and returns relevant error
 * information.
 * @param {any} err - The `err` parameter is an object that represents an error object. It may contain
 * information about the error that occurred, such as the error message or any other relevant details.
 * In this specific function `handleDuplicateError`, the function is designed to handle duplicate
 * errors, extract the relevant information from the error
 * @returns {
 *     statusCode: 400,
 *     message: "Duplicate field error",
 *     errorSources: [
 *         {
 *             path: '',
 *             message: ` already exists!`,
 *         }
 *     ]
 * }
 */
import { TErrorSources } from "../interface/error";

const handleDuplicateError = (err: any) => {
    const match = err?.message?.match(/name:\s*"([^"]+)"/);

    const errorMessage = match ? match[1] : null;
    const errorSources: TErrorSources = [
        {
            path: '',
            message: `${errorMessage} already exists!`,
        }
    ]
    const statusCode = 400; // Bad Request
    return {
        statusCode,
        message: "Dupplicate field error",
        errorSources
    }
}
export default handleDuplicateError;