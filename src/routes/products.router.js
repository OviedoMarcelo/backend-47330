import { Router } from "express";
import ProductManager from "../data/dbManagers/product_manager.js";

const router = Router();


/* Get all */
router.get('/', async (req, res) => {
    try {
        const { page = 1, limit = 10, sort = null, category = null } = req.query;
        const query = {}
        const options = {
            page: page,
            limit: limit
        }
        const prods = await ProductManager.get(query, options);
        res.send({ status: 'success', prods });
    } catch (error) {
        console.log(error);
        res.status(500).send({ status: error, error });
    }
})

/* Get byId */
router.get('/:pid', async (req, res) => {

    const prodId = req.params.pid;
    const product = await ProductManager.getById(prodId)
    product ? res.send({ status: 'success', payload: product }) : res.send({ error: 'Product not found' });

})

/* Add  */
router.post('/', async (req, res) => {
    try {
        const product = req.body;
        if (
            !product.title ||
            !product.description ||
            !product.price ||
            !product.code ||
            !product.stock ||
            !product.category
        ) {
            return res.status(400).send({ status: 'error', error: 'Incomplete or incorrect values' })
        }
        const result = await ProductManager.add(product);
        const io = req.app.get('socketio');
        io.emit('updateProducts', await ProductManager.getAll());
        res.send({ status: 'success', payload: result })
    } catch (error) {
        console.log(error);
        res.status(500).send({ status: error, error });
    }

})

/* Update */
router.put('/:pid', async (req, res) => {
    const product = req.body;
    const productId = req.params.pid;
    const result = await ProductManager.update(productId, product)
    result ? res.send({ status: 'success', payload: result }) : res.status(400).send({ status: 'error', error: 'No se puedo actualizar' });
})

/* Delete */
router.delete('/:pid', async (req, res) => {
    const productId = req.params.pid;
    const result = await ProductManager.delete(productId)
    if (result != null) {
        const io = req.app.get('socketio');
        /* io.emit('updateProducts', await productManager.getAll()); */
        res.send({ status: 'Success', message: 'Eliminado corectamente' })
    } else {
        res.status(400).send({ status: 'error', error: 'No se encontró el elemento a eliminar' });
    }

})

export default router;