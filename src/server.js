import http from 'http'; // import the http module from node.js
import app from './app.js'; // import the express app from the app.js file
import { init } from './db/mongodb.js'; // import the init function from mongodb.js
await init(); // call the init function to establish a connection to the MongoDB database
import config from './config/config.js';

/**
 * Create an HTTP server and start listening for incoming connections on port 8080.
 * The server uses the Express app to handle incoming requests.
 */
const server = http.createServer(app);
const PORT = config.port;

server.listen(PORT, () => {
    console.log(`Server running into http://localhost:${PORT} 🚀`);
});
