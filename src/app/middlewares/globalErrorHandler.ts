/**
 * The globalErrorHandler function in TypeScript handles various types of errors and sends appropriate
 * responses with error details.
 * @param err - The `err` parameter in the `globalErrorHandler` function represents the error object
 * that is passed to the error handler middleware in Express. This object contains information about
 * the error that occurred during the request processing. Depending on the type of error, properties
 * like `statusCode`, `message`, `name`, and
 * @param req - The `req` parameter in the `globalErrorHandler` function stands for the request object.
 * It contains information about the HTTP request that triggered the error, such as headers,
 * parameters, body, URL, etc. This object is provided by Express.js and is used to access details of
 * the incoming HTTP request
 * @param res - The `res` parameter in the `globalErrorHandler` function is the response object in
 * Express.js. It represents the HTTP response that an Express app sends when it receives an HTTP
 * request. You can use methods on this object, such as `res.status()`, `res.json()`, etc., to
 * @param next - The `next` parameter in the `globalErrorHandler` function is a callback function that
 * is used to pass control to the next middleware function in the stack. It is typically used to
 * trigger the next middleware function in the chain. If an error occurs and you want to skip the
 * current middleware and move to
 */
import { ErrorRequestHandler } from "express";
import { ZodError } from "zod";
import handleZodError from "../errors/handleZodError";
import { TErrorSources } from "../interface/error";
import config from "../config";
import handleValidationError from "../errors/handleValidationError";
import handleCastError from "../errors/handleCastError";
import handleDuplicateError from "../errors/handleDuplicateError";
import AppError from "../errors/AppError";

export const globalErrorHandler: ErrorRequestHandler = (err, req, res, next) => {
    let statusCode = err.statusCode || 500;
    let message = err.message || 'Something went wrong';
    let errorSources: TErrorSources = [
        {
            path: '',
            message: "Internal Server Error"
        }
    ]
    // If the error is a ZodError, we can handle it specifically
    if (err instanceof ZodError) {
        const simplifiedError = handleZodError(err)
        statusCode = simplifiedError.statusCode;
        message = simplifiedError.message;
        errorSources = simplifiedError.errorSources;
    } else if (err.name === "ValidationError") {
        // Handle Mongoose validation errors
        const simplifiedError = handleValidationError(err)
        statusCode = simplifiedError?.statusCode; // Bad Request
        message = simplifiedError?.message;
        errorSources = simplifiedError?.errorSources;
    } else if (err.name === "CastError") {
        // Handle Mongoose validation errors
        const simplifiedError = handleCastError(err)
        statusCode = simplifiedError?.statusCode; // Bad Request
        message = simplifiedError?.message;
        errorSources = simplifiedError?.errorSources;
    } else if (err?.code === 11000) {
        // Handle duplicate/already exists errors
        const simplifiedError = handleDuplicateError(err)
        statusCode = simplifiedError?.statusCode; // Bad Request
        message = simplifiedError?.message;
        errorSources = simplifiedError?.errorSources;
    } else if (err instanceof AppError) {
        statusCode = err?.statusCode; // Bad Request
        message = err?.message;
        errorSources = [
            {
                path: '',
                message: err?.message || "An error occurred"
            }
        ]
    } else if (err instanceof Error) {
        message = err?.message;
        errorSources = [
            {
                path: '',
                message: err?.message || "An error occurred"
            }
        ]
    }
    res.status(statusCode).json({
        success: false,
        message,
        errorSources,
        stack: config.env === "development" ? err?.stack : null // Only show stack trace in development
    });
};
