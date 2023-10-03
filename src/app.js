import express from "express";
import ProductManager from "./productManager.js";

const app = express();
//Middleware to support json in the body request
app.use(express.json());

//New product manager instance

const productManager = new ProductManager("./productos.json");
app.use(express.urlencoded({ extended: true }));

app.get('/products', async (req, res) => {

    const products = await productManager.getProducts();
    //If a 'limit' value exists in the query, return that number of elements. Otherwise, return the entire array.
    const limit = req.query.limit ? parseInt(req.query.limit) : products.length;
    res.send(products.slice(0, limit));

})

app.get('/product/:id', async (req, res) => {

    const prodId = parseInt(req.params.id);
    const product = await productManager.getProductByID(prodId)
    product ? res.send(product) : res.send({ error: 'Product not found' });

})

app.post('/product', async (req, res) => {

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


app.put('/product/:id', async (req, res) => {
    const product = req.body;
    const productId = Number(req.params.id);
    const result = await productManager.updateProduct(productId, product)
    result ? res.send({ status: 'Success', message: 'Actualizado corectamente' }) : res.status(400).send({ status: 'error', error: 'No se puedo actualizar' });
})


app.delete('/product/:id', async (req, res) => {
    const productId = Number(req.params.id);
    const result = await productManager.deleteProduct(productId)
    console.log(result)
    result ? res.send({ status: 'Success', message: 'Eliminado correctamente' }) : res.status(400).send({ status: 'error', error: 'No se puedo eliminar' });
})

app.listen(8080, () => console.log('Listening on port 8080'))