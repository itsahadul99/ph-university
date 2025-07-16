import { ZodError } from "zod";
import { TErrorSources } from "../interface/error";

const handleZodError = (error: ZodError) => {
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