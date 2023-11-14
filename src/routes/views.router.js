import { Router } from "express";
import ProductManager from "../data/dbManagers/product_manager.js";
import CartManager from "../data/dbManagers/cart_manager.js";

//Initialize router
const router = Router();
//Product manager
const productManager = new ProductManager();
console.log('aca')
const cartManager = new CartManager();

//Handlebars render

router.get('/home', async (req, res) => {
    try {
        const { page = 1, limit = 10, sort = null, category = null } = req.query;
        const query = {}
        const options = {
            page: page,
            limit: limit
        }
        if (sort) {
            options.sort = { price: sort }
        }
        if (category) {
            query.category = category
        }
        const prods = await ProductManager.get(query, options);
        console.log(prods)
        const user =  "Marcelo"
        res.render('home', { prods, user });
    } catch (error) {
        console.log(error);
    }

})

router.get('/realtimeproducts', async (req, res) => {
    try {
        const prods = await productManager.get();
        res.render('realTimeProducts', { prods });
    } catch (error) {
        console.log(error);
    }

})

router.get('/addproduct', (req, res) => {
    try {
        res.render('addproduct');
    } catch (error) {
        console.log(error)
    }

})

router.get('/chat', (req, res) => {
    try {
        res.render('chat')
    } catch (error) {
        console.log(error)
    }
})

router.get('/cart/:cid', async (req, res) => {
    try {
        const idCart = req.params.cid;
        const cart = await cartManager.getById(idCart);
        res.render('cart', { cart })
    } catch (error) {
        console.log(error)
    }
})

router.get('/home/:cid/product/:pid', async (req, res) => {
    try {
        const refererUrl = req.headers.referer;
        const cartId = req.params.cid;
        const productId = req.params.pid;
        const product = await productManager.getById(productId);
        const cart = await cartManager.getById(cartId);
        cartManager.addToCart(cart._id, product._id);
        res.redirect(refererUrl)
    } catch (error) {
        console.log(error);
        res.status(500).send({ status: error, error });
    }
})


export default router;