/* This code snippet is a TypeScript module that is importing the `dotenv` and `path` modules. */
import dotenv from 'dotenv'
import path from 'path'
dotenv.config({ path: path.join((process.cwd(), '.env')) })

export default {
    env: process.env.NODE_ENV,
    port: process.env.PORT,
    database_url: process.env.DATABASE_URL,
    bcrypt_salt_rounds: process.env.BCRYPT_SALT_ROUNDS,
    default_password: process.env.DEFAULT_PASSWORD,
    jwt_access_secret: process.env.JWT_ACCESS_SECRET,
}