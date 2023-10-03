import { Router } from "express";

const router = Router();

router.get('/products', async (req, res) => {

    const products = await productManager.getProducts();
    //If a 'limit' value exists in the query, return that number of elements. Otherwise, return the entire array.
    const limit = req.query.limit ? parseInt(req.query.limit) : products.length;
    res.send(products.slice(0, limit));

})

router.get('/product/:id', async (req, res) => {

    const prodId = parseInt(req.params.id);
    const product = await productManager.getProductByID(prodId)
    product ? res.send(product) : res.send({ error: 'Product not found' });

})

router.post('/product', async (req, res) => {

    const product = req.body;
    if (
        !product.title ||
        !product.description ||
        !product.price ||
        !product.thumbnail ||
        !product.code ||
        !product.stock
    ) {
        return res.status(400).send({ status: 'error', error: 'Incomplete or incorrect values' })
    }
    await productManager.addProduct(product);
    res.send({ status: 'succes', message: 'Product add' })

})


router.put('/product/:id', async (req, res) => {
    const product = req.body;
    const productId = Number(req.params.id);
    const result = await productManager.updateProduct(productId, product)
    result ? res.send({ status: 'Success', message: 'Actualizado corectamente' }) : res.status(400).send({ status: 'error', error: 'No se puedo actualizar' });
})


router.delete('/product/:id', async (req, res) => {
    const productId = Number(req.params.id);
    const result = await productManager.deleteProduct(productId)
    console.log(result)
    result ? res.send({ status: 'Success', message: 'Eliminado correctamente' }) : res.status(400).send({ status: 'error', error: 'No se puedo eliminar' });
})