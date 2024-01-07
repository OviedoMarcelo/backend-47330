import { Router } from "express";
import ProductController from "../../controller/products.controller.js";

const router = Router();

router.get('/', async (req, res, next) => {
    try {
        const orders = await ProductController.getAll();
        res.status(200).json({ message: orders })
    } catch (error) {
        next(error)
    }
});


router.get('/:pid', async (req, res, next) => {
    try {
        const { params: { pid } } = req;
        const order = await ProductController.getById(pid);
        res.status(200).json({ message: order });
    } catch (error) {
        next(error);
    }
});


router.post('/', async (req, res, next) => {
    try {
        const { body } = req;
        const order = await ProductController.create(body);
        res.status(201).json({ message: order });
    } catch (error) {
        next(error);
    }
});

router.post('/:pid', async (req, res, next) => {
    try {
        const { body } = req;
        const order = await ProductController.create(body);
        res.status(201).json({ message: order });
    } catch (error) {
        next(error);
    }
});




router.put('/:pid', async (req, res, next) => {
    try {
        const { params: { pid }, body } = req;
        await ProductController.updateById(pid, body);
        res.status(204).json({ message: order });
    } catch (error) {
        next(error);
    }
});


export default router;