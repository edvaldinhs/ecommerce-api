import express from 'express';
import { PrismaClient } from '../generated/prisma/index.js';

const router = express.Router();
const prisma = new PrismaClient();

router.get('/', async (req, res) => {
    try {
        const produtos = req.query.name
            ? await prisma.produto.findMany({
                where: { name: req.query.name }
              })
            : await prisma.produto.findMany();

        res.status(200).json(produtos);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Erro ao buscar produtos" });
    }
});

router.get('/:id', async (req, res) => {
  try {
    const product = await prisma.produto.findUnique({
      where: { id: req.params.id }
    });
    if (!product) return res.status(404).json({ error: "Produto não encontrado" });
    res.json(product);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Erro ao buscar produto" });
  }
});


router.post('/', async (req, res) => {
    try {
        const produto = await prisma.produto.create({
            data: req.body
        });
        res.status(201).json(produto);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Erro ao criar produto" });
    }
});

router.put('/:id', async (req, res) => {
    try {
        const produto = await prisma.produto.update({
            where: { id: req.params.id },
            data: req.body
        });
        res.status(200).json(produto);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Erro ao editar produto" });
    }
});

router.delete('/:id', async (req, res) => {
    try {
        await prisma.produto.delete({
            where: { id: req.params.id },
        });
        res.status(200).json({ message: "Produto deletado com sucesso" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Erro ao deletar produto" });
    }
});

export default router;
