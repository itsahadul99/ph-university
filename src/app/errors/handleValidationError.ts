/**
 * The function `handleValidationError` in TypeScript handles mongoose validation errors and returns a
 * generic error response with error sources.
 * @param err - The `err` parameter in the `handleValidationError` function is expected to be a
 * Mongoose validation error object. It specifically handles errors of type
 * `mongoose.Error.ValidationError`.
 * @returns The `handleValidationError` function returns a `TGenericErrorResponse` object with a status
 * code of 400 (Bad Request), a message of "Validation error", and an array of error sources containing
 * the path and message of each validation error from the `mongoose.Error.ValidationError` object
 * passed to the function.
 */
import mongoose from "mongoose"
import { TErrorSources, TGenericErrorResponse } from "../interface/error";

const handleValidationError = (err: mongoose.Error.ValidationError): TGenericErrorResponse => {

    const errorSources: TErrorSources = Object.values(err?.errors).map((error: mongoose.Error.ValidatorError | mongoose.Error.CastError) => {
        return {
            path: error?.path,
            message: error?.message
        }
    })
    const statusCode = 400; // Bad Request
    return {
        statusCode,
        message: "Validation error",
        errorSources
    }
}
export default handleValidationError