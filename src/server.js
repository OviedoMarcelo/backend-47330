import http from 'http';
import app from './app.js';
import { init } from './data/mongodb.js';
await init();
import { Server } from "socket.io";
import Message from './data/dbManagers/message_manager.js';

const server = http.createServer(app);
const PORT = 8080;

server.listen(PORT, () => {
    console.log(`Server running into http://localhost:${PORT} 🚀`);
});

//io configuration

const io = new Server(server);
app.set('socketio', io);

const messages = [];
const messageManager = new Message();

io.on('connection', socket => {
    console.log('Nuevo cliente conectado');

    socket.on('message', async data => {
        try {
            await messageManager.add(data);
            const messages = await messageManager.getAll();
            io.emit('messageLogs', messages);
        } catch (error) {
            console.log(error);
        }
    });

    socket.on('authenticated', data => {
        socket.emit('messageLogs', messages);
        socket.broadcast.emit('newUserConnected', data);
    });
});
