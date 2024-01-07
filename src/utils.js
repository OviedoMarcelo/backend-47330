// Import necessary modules
import path from 'path';
import { fileURLToPath } from 'url';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config()

// Convert the current file's URL to a path
const __filename = fileURLToPath(import.meta.url);

// Get the directory name of the current file
export const __dirname = path.dirname(__filename);

// Define the secret key for JWT
export const JWT_SECRET = process.env.JWT_SECRET;

// Generate a JWT token based on the user object
export const tokenGenerator = (user) => {
    // Destructure user object properties
    const { _id, first_name, last_name, email } = user;

    // Create a payload object containing the user's details
    const payload = {
        id: _id,
        first_name,
        last_name,
        email
    };

    // Sign the payload and set an expiration time of 10 seconds
    return jwt.sign(payload, JWT_SECRET, { expiresIn: '10s' });
};

// Create a custom exception class that can handle different status codes
export class Exception extends Error {
    constructor(message, statusCode) {
        super(message);
        this.status = statusCode;
    }
}

// Create a subclass of Exception for handling 404 errors
export class NotFoundException extends Exception {
    constructor(message) {
        super(message, 404);
    }
}

// Create a subclass of Exception for handling 400 errors
export class BadRequestException extends Exception {
    constructor(message) {
        super(message, 400);
    }
}

// Create a subclass of Exception for handling 403 errors
export class ForbiddenException extends Exception {
    constructor(message) {
        super(message, 403);
    }
}