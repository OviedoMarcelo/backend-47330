import { Router } from "express";
import CartManager from "../data/dbManagers/cart_manager.js";
import ProductManager from "../data/dbManagers/product_manager.js"

const router = Router();

//Get all Carts
router.get('/', async (req, res) => {

    const carts = await CartManager.get();
    //If a 'limit' value exists in the query, return that number of elements. Otherwise, return the entire array.
    const limit = req.query.limit ? parseInt(req.query.limit) : carts.length;
    res.send(carts.slice(0, limit));

})

//Get Cart by ID

router.get('/:cid', async (req, res) => {

    const cartId = req.params.cid;
    const cart = await CartManager.getById(cartId)
    cart ? res.send({ status: 'success', payload: cart }) : res.send({ error: 'Cart not found' });

})

//Create a new cart

router.post('/', async (req, res) => {

    await CartManager.create();
    res.send({ status: 'succes', message: 'Create cart succesfuly' })

})


router.post('/:cid/product/:pid', async (req, res) => {
    try {
        const cartId = req.params.cid;
        const productId = req.params.pid;
        const product = await ProductManager.getById(productId);
        const cart = await CartManager.getById(cartId);
        CartManager.addToCart(cart._id, product._id);
        res.send({ status: 'succes', message: 'Producto add to Cart' })
    } catch (error) {
        console.log(error);
        res.status(500).send({ status: error, error });
    }


})

/* Update quantity products value */

router.put('/:cid/product/:pid', async (req, res) => {
    try {
        const { quantity } = req.body;
        const cartId = req.params.cid;
        const productId = req.params.pid;
        const product = await ProductManager.getById(productId);
        const cart = await CartManager.getById(cartId);
        console.log(product)
        console.log(cart)
        if (!product || !cart || !quantity) {
            return res.status(400).send({ status: 'error', message: 'bad request or invalid' });
        }
        await CartManager.updateProductQuantity(cartId, productId, quantity)
        res.send({ status: 'success', message: 'Quantity updated succesfully' })
    } catch (error) {
        console.log(error);
        res.status(500).send({ status: error, error });
    }
})

/* Update cart with a products array */

router.put('/:cid', async (req, res) => {
    try {
        const { products } = req.body;
        const cartId = req.params.cid;
        const cart = await CartManager.getById(cartId);
        if (!cart || !products) {
            return res.status(400).send({ status: 'error', message: 'bad request or invalid' });
        }
        await CartManager.updateCartProducts(cartId, products)
        res.send({ status: 'success', message: 'Cart updated succesfully' })
    } catch (error) {
        console.log(error);
        res.status(500).send({ status: error, error });
    }
})

/* Delete an especific product in an especific cart */

router.delete('/:cid/product/:pid', async (req, res) => {
    try {
        const cartId = req.params.cid;
        const productId = req.params.pid;
        await CartManager.deleteProduct(cartId, productId);
        res.send({ status: 'succes', message: 'Product delete succesfully' })
    } catch (error) {
        console.log(error);
        res.status(500).send({ status: error, error });
    }

})

/* Delete all products in a cart */
router.delete('/:cid', async (req, res) => {
    try {
        const cartId = req.params.cid;
        await CartManager.deleteAllProducts(cartId);
        res.send({ status: 'succes', message: 'All products delete succesfully' })
    } catch (error) {
        console.log(error);
        res.status(500).send({ status: error, error });
    }

})


export default router;