import express from 'express';
import { PrismaClient } from '../generated/prisma/index.js';

const router = express.Router();
const prisma = new PrismaClient();

router.post('/', async (req, res) => {
    const { cartId, produtoId, quantity } = req.body;
    try {
        const item = await prisma.cartItem.create({
            data: {
                cartId,
                produtoId,
                quantity
            }
        });
        res.status(201).json(item);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Erro ao adicionar produto ao cart" });
    }
});

router.put('/:id', async (req, res) => {
    try {
        const item = await prisma.cartItem.update({
            where: { id: req.params.id },
            data: { quantity: req.body.quantity }
        });
        res.status(200).json(item);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Erro ao atualizar item do cart" });
    }
});

router.delete('/:id', async (req, res) => {
    try {
        await prisma.cartItem.delete({
            where: { id: req.params.id }
        });
        res.status(200).json({ message: "Produto removido do cart" });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Erro ao remover item do cart" });
    }
});

export default router;
