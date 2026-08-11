import compression from 'compression';
import cors from 'cors';
import express from 'express';
import helmet from 'helmet';
import authRoutes from './routes/auth.route.js';
import memberRoutes from './routes/member.routes.js';
import userRoutes from './routes/user.routes.js';

const app = express();



app.use(cors());
app.use(helmet());
app.use(compression());
app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/members', memberRoutes);

app.use(express.urlencoded({ extended: true }));

app.get('/', (req,res) =>{
    res.json({
        success: true,
        message: 'Welcome to GCMS API'
    });
});

export default app;