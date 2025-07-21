/**
 * The `catchAsync` function is a higher order function in TypeScript that wraps an Express request
 * handler to catch any asynchronous errors and pass them to the next middleware.
 * @param {RequestHandler} fn - RequestHandler - a function that takes Request, Response, and
 * NextFunction as parameters and returns void.
 * @returns The `catchAsync` function is returning a new function that takes `req`, `res`, and `next`
 * as parameters. This new function wraps the original `fn` function in a Promise and catches any
 * errors that occur, passing them to the `next` function.
 */
import { NextFunction, Request, RequestHandler, Response } from "express"

export const catchAsync = (fn: RequestHandler) => {
    return (req: Request, res: Response, next: NextFunction) => {
        Promise.resolve(fn(req, res, next)).catch(err => next(err))
    }
}