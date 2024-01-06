import { Router } from "express";
import OrdersController from "../../controller/orders.controller.js";

const router = Router();

router.get('/', async (req, res, next) => {
    try {
        const orders = await OrdersController.getAll();
        res.status(200).json({ message: orders })
    } catch (error) {
        next(error)
    }
});


router.get('/:oid', async (req, res, next) => {
    try {
        const { params: { oid } } = req;
        const order = await OrdersController.getById(oid);
        res.status(200).json({ message: order });
    } catch (error) {
        next(error);
    }
});


router.post('/', async (req, res, next) => {
    try {
        const { body } = req;
        const order = await OrdersController.create(body);
        res.status(201).json({ message: order });
    } catch (error) {
        next(error);
    }
});


router.put('/:oid', async (req, res, next) => {
    try {
        const { params: { oid }, body } = req;
        await OrdersController.updateById(oid, body);
        res.status(204).json({ message: order });
    } catch (error) {
        next(error);
    }
});


export default router;