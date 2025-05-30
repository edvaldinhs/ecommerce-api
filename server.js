import express from 'express';
import produtoRoutes from './routes/produto.js';
import userRoutes from './routes/user.js';

const app = express();
app.use(express.json());

app.use('/produto', produtoRoutes);
app.use('/user', userRoutes);

app.listen(3000, () => {
    console.log('Server running on http://localhost:3000');
});