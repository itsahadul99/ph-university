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
