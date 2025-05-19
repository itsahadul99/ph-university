import { RequestHandler } from "express";
import httpStatus from 'http-status';

export const notFoundHandler: RequestHandler = (req, res, next) => {
    res.status(httpStatus.NOT_FOUND).json({
        success: false,
        message: "API Not Found !!",
        error: ''
    });
}