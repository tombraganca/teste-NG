import { Router } from "express";
import { authenticateController } from "./useCase/authenticate";
import { createUserController } from "./useCase/create-user";

const authRouter = Router();

authRouter.post("/register", (request, response) => {
    return createUserController.handle(request, response);
});

authRouter.post("/login", (request, response) => {
    return authenticateController.handle(request, response);
});

export { authRouter };

