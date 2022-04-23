import { generateRandomString } from "./util.js";

/**
 * Typically, the JWT secret would be within a vault or encrypted in environmental variables.
 * Also, it should not be generated every time the application starts up.
 * However, to make it easy for anyone to start this portfolio piece,
 * and to avoid being flagged as not secure by GitHub,
 * I generating the JWT token so that it is not hardcoded.
 */
const jwtSecret = generateRandomString();
const sessionSecret = generateRandomString();

export const JWT_SECRET = jwtSecret;
export const JWT_EXPIRY_IN_MILLISECONDS = 86400000; // 24 hours (normally, this would be 15 minutes for applications with sensitive data)
export const SESSION_SECRET = sessionSecret;
export const SESSION_EXPIRY_IN_MILLISECONDS = 5400000; // 90 minutes
