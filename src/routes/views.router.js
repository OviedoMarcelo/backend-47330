import { Router } from "express";
import ProductManager from "../data/dbManagers/product_manager.js"


//Initialize router
const router = Router();
//Product manager
const products = new ProductManager("../src/files/productos.json");

//Handlebars render
router.get('/home', async (req, res) => {
    const prod = await products.get;
    res.render('home', {prod});
})

router.get('/realtimeproducts', async (req, res) => {
    const prod = await products.get();
    res.render('realTimeProducts',{prod});
})


router.get('/addproduct', (req, res) => {
        res.render('addproduct');
})

router.get('/chat', (req,res) =>{
    try {
        res.render('chat')
    } catch (error) {
        console.log(error)
    }
})

export default router;