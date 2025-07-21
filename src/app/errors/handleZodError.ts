/**
 * The function `handleZodError` takes a ZodError object and returns a generic error response with
 * status code 400 and error details extracted from the ZodError.
 * @param {ZodError} error - The `error` parameter in the `handleZodError` function is of type
 * `ZodError`, which is an error type provided by the Zod library. It represents validation errors that
 * occur when validating data against Zod schemas.
 * @returns The `handleZodError` function is returning a `TGenericErrorResponse` object with a status
 * code of 400 (Bad Request), a message of "Validation error", and an array of error sources containing
 * information about the validation errors from the ZodError object.
 */
import { ZodError } from "zod";
import { TErrorSources, TGenericErrorResponse } from "../interface/error";

const handleZodError = (error: ZodError): TGenericErrorResponse => {
    const errorSources: TErrorSources = error?.errors?.map((err) => {
        return {
            path: err?.path[err?.path?.length - 1] || "unknown",
            message: err?.message,
        }
    })
    const statusCode = 400; // Bad Request
    return {
        statusCode,
        message: "Validation error",
        errorSources
    }
}

export default handleZodError;