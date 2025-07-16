import mongoose from "mongoose"
import { TErrorSources, TGenericErrorResponse } from "../interface/error";

const handleValidationError = (err: mongoose.Error.ValidationError): TGenericErrorResponse => {

    const errorSources: TErrorSources = Object.values(err?.errors).map((error: mongoose.Error.ValidatorError | mongoose.Error.CastError) => {
        return {
            path: error?.path,
            message: error?.message
        }
    })
    const statusCode = 400; // Bad Request
    return {
        statusCode,
        message: "Validation error",
        errorSources
    }
}
export default handleValidationError