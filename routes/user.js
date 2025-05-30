import express from 'express';
import { PrismaClient } from '../generated/prisma/index.js';

const router = express.Router();
const prisma = new PrismaClient();

router.get('/', async (req, res) => {
    try {
        const users = req.query.name
            ? await prisma.user.findMany({
                where: { name: req.query.name }
              })
            : await prisma.user.findMany();

        res.status(200).json(users);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Erro ao buscar users" });
    }
});


router.post('/', async (req, res) => {
    try {
        const user = await prisma.user.create({
            data: req.body
        });
        res.status(201).json(user);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Erro ao criar user" });
    }
});

router.put('/:id', async (req, res) => {
    try {
        const user = await prisma.user.update({
            where: { id: req.params.id },
            data: req.body
        });
        res.status(200).json(user);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Erro ao editar user" });
    }
});

router.delete('/:id', async (req, res) => {
    try {
        await prisma.user.delete({
            where: { id: req.params.id },
        });
        res.status(200).json({ message: "User deletado com sucesso" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Erro ao deletar user" });
    }
});

export default router;
