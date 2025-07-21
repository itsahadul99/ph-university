/**
 * The `notFoundHandler` function is an Express middleware that sends a JSON response with a 404 status
 * code and a message indicating that the API endpoint was not found.
 * @param req - The `req` parameter in the code snippet represents the request object in Express.js. It
 * contains information about the HTTP request such as headers, parameters, body, and query parameters.
 * This object is passed to middleware functions and route handlers in Express to access and process
 * the incoming request data.
 * @param res - The `res` parameter in the code snippet refers to the response object in Express.js. It
 * is used to send a response back to the client making the request. In this case, the `res` object is
 * being used to set the HTTP status to 404 (NOT_FOUND) and send a
 * @param next - The `next` parameter in an Express middleware function is a callback function that is
 * used to pass control to the next middleware function in the stack. It is typically used to trigger
 * the next middleware function in the chain. If an error occurs or if the current middleware function
 * cannot handle the request, you can
 */
import { RequestHandler } from "express";
import httpStatus from 'http-status';

export const notFoundHandler: RequestHandler = (req, res, next) => {
    res.status(httpStatus.NOT_FOUND).json({
        success: false,
        message: "API Not Found !!",
        error: ''
    });
}