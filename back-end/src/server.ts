import 'express-async-error';
import express, { Application, Request, Response } from 'express';
import cors from 'cors'
import { config } from './config/config';

import { router } from './routes';

const app: Application = express();

app.use(express.json());
app.use(cors());

app.use(express.urlencoded({ extended: true }));

app.use(router);

app.use((err: Error, req: Request, res: Response) => {
    return res.status(500).json({ message: err.message });
});

app.get("/", (_req: Request, res: Response) => {
    res.send(`Server is running on port: ${config.PORT}`);
});

app.listen(config.PORT, () => {
    console.log(`Server is running on port: ${config.PORT}`);
});
