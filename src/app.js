import express from "express";
import handlerbars from 'express-handlebars';
import handlebars from 'handlebars';
import viewsRouter from './routes/views.router.js';
import productsRouter from './routes/products.router.js';
import cartsRouter from './routes/carts.router.js';
import __dirname from "./utils.js";
import { Server } from "socket.io";

const app = express();

//config params
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
//config to support static files
app.use(express.static(`${__dirname}/public`));

//Config handlebars
handlebars.registerPartial('partials', `${__dirname}/partials`);
app.engine('handlebars', handlerbars.engine());
app.set('views', `${__dirname}/views`)
app.set('view engine', 'hbs')



//routes
app.use('/', viewsRouter)

//API Rest routes
app.use('/api/products', productsRouter);
app.use('/api/carts', cartsRouter);

//error controller middleware, allways at the end

app.use((error, req, res, next) => {
    const message = `Ah ocurrido un error inesperado 😨: ${error.message}`;
    console.error(message);
    res.status(500).json({ message });
});


//io configuration

/* const io = new Server(server);
app.set('socketio', io); */


export default app;