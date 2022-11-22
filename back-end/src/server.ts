import 'express-async-error';
import express, { Application, Request, Response } from 'express';
import cors from 'cors'
import { config } from './config/config';

import { router } from './routes';
import { PrismaClient } from '@prisma/client';

const app: Application = express();

app.use(express.json());
app.use(cors());

app.use(express.urlencoded({ extended: true }));

app.use(router);

app.get("/", (_req: Request, res: Response) => {
    res.send(`Server is running on port: ${config.PORT}`);
});

app.listen(config.PORT, () => {
    console.log(`Server is running on port: ${config.PORT}`);
});