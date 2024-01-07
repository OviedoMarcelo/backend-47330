// Importing required modules and functions
import express from 'express';
import handlebars from 'express-handlebars';
import path from 'path';
import cors from 'cors';
import passport from 'passport';
import cookieParse from 'cookie-parser';
import indexRouter from './routers/views/index.router.js';
import usersRouter from './routers/api/users.router.js';
import authRouter from './routers/api/auth.router.js';
import productRouter from './routers/api/product.router.js';
import ordersRouter from './routers/api/orders.router.js';
import { Exception, __dirname } from './utils.js';
import { init as initPassport } from './config/passport.config.js';

const app = express();

// Setting up CORS middleware to handle cross-origin resource sharing
const corsOptions = {
    origin: 'http://localhost:5500',
    methods: ['GET', 'POST', 'PUT'],
};

app.use(cors(corsOptions));
app.use(cookieParse());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, '../public')));

//Config handlebars
app.engine('handlebars', handlerbars.engine());
app.set('views', `${__dirname}/views`)
app.set('view engine', 'handlebars')

//Aditional handlebars config
handlebars.registerPartial('partials', `${__dirname}/partials`);
handlebars.registerHelper('eq', function (a, b, options) {
    return a === b ? options.fn(this) : options.inverse(this);
});


// Initializing Passport middleware
initPassport();

app.use(passport.initialize());

// Setting up router middleware for different API endpoints
app.use('/', indexRouter);
app.use('/api/auth', authRouter);
app.use('/api/users', usersRouter);
app.use('/api/business', productRouter);
app.use('/api/orders', ordersRouter);

// Error handling middleware
app.use((err, req, res, next) => {
    if (err instanceof Exception) {
        return res.status(err.status).json({ message: err.message });
    }
    console.error(err.stack);
    res.status(500).json({ message: 'Server Error' });
});

export default app;