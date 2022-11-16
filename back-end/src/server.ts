import express, { Application, Request, Response } from 'express';
import { PrismaClient } from '@prisma/client'

const app: Application = express();
const prisma = new PrismaClient()

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const port: number = 3000;

app.get("/", (_req, res: Response) => {
    res.send(`Server is running on port: ${port}`);
});

app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
}
);
