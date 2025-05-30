import express from 'express'
import { PrismaClient } from './generated/prisma/index.js'

const prisma = new PrismaClient()


const app = express()
app.use(express.json())


app.get('/produto', async (req, res) => {
    let produtos = [];

    if(req.query){
        produtos = await prisma.produto.findMany({
            where: {
                name: req.query.name,
            }
        })
    }else{
        produtos = await prisma.produto.findMany()
    }
    
    res.status(201).json(produtos)
})

app.post('/produto', async (req, res) => {
    try {
        const produto = await prisma.produto.create({
            data: {
                name: req.body.name,
                price: req.body.price,
                about: req.body.about,
                rating: req.body.rating
            }
        });
        res.status(200).json(produto);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Erro ao criar produto" });
    }
});

app.put('/produto/:id', async (req, res) => {
    try {
        const produto = await prisma.produto.update({
            where: {
                id: req.params.id
            },
            data: {
                name: req.body.name,
                price: req.body.price,
                about: req.body.about,
                rating: req.body.rating
            }
        });
        res.status(200).json(produto);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Erro ao editar produto" });
    }
});

app.delete('/produto/:id', async (req, res) => {
    try {
        await prisma.produto.delete({
            where: {
                id: req.params.id,
            },
        })
        res.status(200).json({ message: "Produto deletado com Sucesso" });
    }catch (error) {
        console.error(error);
        res.status(500).json({ error: "Erro ao deletar produto" });
        }
    });


app.listen(3000)



// edinho
// L0v2vKmY5vaUhH1L