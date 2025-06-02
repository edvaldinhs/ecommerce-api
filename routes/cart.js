import express from 'express';
import { PrismaClient } from '../generated/prisma/index.js';

const router = express.Router();
const prisma = new PrismaClient();

router.get('/:userId', async (req, res) => {
    try {
        let cart = await prisma.cart.findFirst({
            where: { userId: req.params.userId },
            include: {
                items: {
                    include: {
                        produto: true
                    }
                }
            }
        });

        if (!cart) {
            cart = await prisma.cart.create({
                data: {
                    userId: req.params.userId
                },
                include: {
                    items: {
                        include: {
                            produto: true
                        }
                    }
                }
            });
        }

        res.status(200).json(cart);
    } catch (err) {
        console.error("Erro ao buscar ou criar cart:", err);
        res.status(500).json({ error: "Erro ao buscar ou criar cart" });
    }
});


router.post('/', async (req, res) => {
    try {
        const cart = await prisma.cart.create({
            data: {
                userId: req.body.userId
            }
        });
        res.status(201).json(cart);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Erro ao criar cart" });
    }
});

export default router;
