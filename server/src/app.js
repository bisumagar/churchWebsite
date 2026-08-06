import compression from 'compression';
import cors from 'cors';
import express from 'express';
import helmet from 'helmet';


const app = express();


app.use(cors());
app.use(helmet());
app.use(compression());
app.use(express.json());

app.use(express.urlencoded({ extended: true }));

app.get('/', (req,res) =>{
    res.json({
        success: true,
        message: 'Welcome to GCMS API'
    });
});

export default app;