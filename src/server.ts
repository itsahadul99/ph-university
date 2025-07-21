/**
 * The above TypeScript code connects to a MongoDB database, starts a server using Express, and handles
 * unhandled rejections and exceptions.
 */
import { Server } from "http";
import app from "./app";
import config from "./app/config";
import mongoose from "mongoose";
let server: Server
async function main() {
    try {
        await mongoose.connect(config.database_url as string);
        server = app.listen(config.port, () => {
            console.log(`The server app listening on port ${config.port}`)
        })
    } catch (error) {
        console.log(error);
    }
}
main()

// Handle Unhandled Rejection
process.on('unhandledRejection', () => {
    if(server) {
        server.close(() => {
            console.log('Unhandled Rejection, server is shutting down...');
            process.exit(1);
        });
    }
    process.exit(1);
})
// Handle Unhandled Exception
process.on('uncaughtException', () => {
    console.log('Unhandled Exception, server is shutting down...');
    process.exit(1);
})