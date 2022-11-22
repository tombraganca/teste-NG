import { Router } from "express";
import { ensureAuthenticated } from "./middleware/ensureAuthenticated";
import { authenticateController } from "./useCase/authenticate-user";
import { createUserController } from "./useCase/create-user";
import { refreshTokenUserController } from "./useCase/refresh-token-use";

const router = Router();

router.post("/register", (request, response) => {
    return createUserController.handle(request, response);
});

router.post("/login", (request, response) => {
    return authenticateController.handle(request, response);
});

router.post("/refresh-token", (request, response) => {
    console.log(request.body);
    return refreshTokenUserController.handle(request, response);
});

router.get('/test', ensureAuthenticated, (request, response) => {
    return response.json({ message: "Hello World" })
})

export { router };

