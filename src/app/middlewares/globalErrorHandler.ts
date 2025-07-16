import { ErrorRequestHandler } from "express";
import { ZodError } from "zod";
import handleZodError from "../errors/handleZodError";
import { TErrorSources } from "../interface/error";
import config from "../config";

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
    }

    res.status(statusCode).json({
        success: false,
        message,
        errorSources,
        stack: config.env === "development" ? err?.stack : null // Only show stack trace in development
    });
};
