import express from 'express';
import cors from 'cors'
import produtoRoutes from './routes/produto.js';
import userRoutes from './routes/user.js';
import cartRoutes from './routes/cart.js';
import cartItemRoutes from './routes/cartItem.js';

const app = express();
app.use(express.json());

//Cuidado com esse cors, lembrar de configurar!!
app.use(cors())

app.use('/produto', produtoRoutes);
app.use('/user', userRoutes);
app.use('/cart', cartRoutes);
app.use('/cartItem', cartItemRoutes);

app.listen(3000, () => {
    console.log('Server running on http://localhost:3000');
});