import express from "express";
import expressSesion from 'express-session'
import MongoStore from "connect-mongo";
import handlerbars from 'express-handlebars';
import handlebars from 'handlebars';
import viewsRouter from './routes/views.router.js';
import productsRouter from './routes/products.router.js';
import cartsRouter from './routes/carts.router.js';
import sessionRouter from './routes/session.router.js'
import __dirname from "./utils.js";
import dotenv from 'dotenv';
dotenv.config();

const SESSION_SECRET = process.env.SESSION_SECRET;
const MONGODB_URI = process.env.MONGODB_URI;

const app = express();

app.use(expressSesion({
    store: MongoStore.create({
        mongoUrl: MONGODB_URI,
        mongoOptions: {},
        ttl: 3600
    }),
    secret: SESSION_SECRET,
    resave: true,
    saveUninitialized: true
}))


//config express params
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
//config to support static files
app.use(express.static(`${__dirname}/public`));


//Config handlebars
app.engine('handlebars', handlerbars.engine());
app.set('views', `${__dirname}/views`)
app.set('view engine', 'handlebars')

//Aditional handlebars config
handlebars.registerPartial('partials', `${__dirname}/partials`);
handlebars.registerHelper('eq', function (a, b, options) {
    return a === b ? options.fn(this) : options.inverse(this);
});


//routes
app.use('/', viewsRouter)

//API Rest routes
app.use('/api/products', productsRouter);
app.use('/api/carts', cartsRouter);
app.use('/api/sessions', sessionRouter);

//error controller middleware, allways at the end

app.use((error, req, res, next) => {
    const message = `Ah ocurrido un error inesperado 😨: ${error.message}`;
    console.error(message);
    res.status(500).json({ message });
});



export default app;