/**
 * The function `handleCastError` in TypeScript handles mongoose cast errors by creating a generic
 * error response with specific error sources.
 * @param err - The `err` parameter is of type `mongoose.Error.CastError`, which is an error type
 * specific to Mongoose that occurs when a value can't be cast to the required type during validation.
 * @returns The `handleCastError` function is returning a `TGenericErrorResponse` object with a status
 * code of 400 (Bad Request), a message of "Validation error", and an array of error sources containing
 * the path and message from the `mongoose.Error.CastError` object.
 */
import mongoose from "mongoose";
import { TErrorSources, TGenericErrorResponse } from "../interface/error";

const handleCastError = (err: mongoose.Error.CastError): TGenericErrorResponse => {
    const errorSources: TErrorSources = [
        {
            path: err?.path,
            message: err?.message
        }
    ]
    const statusCode = 400; // Bad Request
    return {
        statusCode,
        message: "Validation error",
        errorSources
    }
}

export default handleCastError;