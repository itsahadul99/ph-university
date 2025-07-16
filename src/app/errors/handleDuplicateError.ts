import { TErrorSources } from "../interface/error";

const handleDuplicateError = (err: any) => {
    const match = err?.message?.match(/name:\s*"([^"]+)"/);

    const errorMessage = match ? match[1] : null;
    const errorSources: TErrorSources = [
        {
            path: '',
            message: `${errorMessage} already exists!`,
        }
    ]
    const statusCode = 400; // Bad Request
    return {
        statusCode,
        message: "Dupplicate field error",
        errorSources
    }
}
export default handleDuplicateError;