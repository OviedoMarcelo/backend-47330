import dotenv from 'dotenv'; // import the dotenv package for loading environment variables from a .env file
dotenv.config(); // load the environment variables from the .env file

export default {
    // Define the configuration settings for the application
    port: process.env.PORT || 8080, // set the port for the application to use. Use the environment variable 'PORT' if it exists, otherwise use 8080.
    mongodbUri: process.env.MONGODB_URI || 'mongodb://localhost:27017/ecommerce', // set the MongoDB connection string. Use the environment variable 'MONGODB_URI' if it exists, otherwise use the default connection string.
}