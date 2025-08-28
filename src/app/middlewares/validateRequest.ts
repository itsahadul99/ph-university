/**
 * The `validateRequest` function in TypeScript uses Zod schema to validate the request body in an
 * Express middleware.
 * @param {AnyZodObject} schema - The `schema` parameter in the `validateRequest` function is an object
 * that represents a validation schema defined using Zod. Zod is a TypeScript-first schema declaration
 * and validation library. In this context, the schema is used to validate the request body of an
 * incoming HTTP request in an Express application.
 * @returns The `validateRequest` function is being returned.
 */
import { NextFunction, Request, Response } from "express";
import { AnyZodObject } from "zod";
import { catchAsync } from "../utils";

export const validateRequest = (schema: AnyZodObject) => {
    return catchAsync(async (req: Request, res: Response, next: NextFunction) => {
        await schema.parseAsync({
            body: req.body,
            cookies: req.cookies,
        })
        return next();
    })
}