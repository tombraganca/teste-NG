import express, { Application, Request, Response } from 'express';
import { authRouter } from './auth/routes';

const app: Application = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/auth', authRouter);

const port: number = 3000;

app.get("/", (_req, res: Response) => {
    res.send(`Server is running on port: ${port}`);
});


app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
}
);
