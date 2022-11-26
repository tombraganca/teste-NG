import { Router } from "express";
import { ensureAuthenticated } from "./middleware/ensureAuthenticated";
import { authenticateController } from "./useCase/auth/authenticate-user";
import { createUserController } from "./useCase/auth/create-user";
import { findAccountController } from "./useCase/account/find-account-by-email";
import { refreshTokenUserController } from "./useCase/auth/refresh-token-user";
import { transferController } from "./useCase/transactions/do-a-transfer";
import { listTransferController } from "./useCase/transactions/list-transfer";

const router = Router();

router.post("/register", (request, response) => {
    return createUserController.handle(request, response);
});

router.post("/login", (request, response) => {
    return authenticateController.handle(request, response);
});

router.post("/refresh-token", (request, response) => {
    return refreshTokenUserController.handle(request, response);
});

router.get('/account', ensureAuthenticated, (request, response) => {
    return findAccountController.handle(request, response);
});

router.post('/transfer', ensureAuthenticated, (request, response) => {
    return transferController.handle(request, response);
});

router.get('/transfer/:accountId', ensureAuthenticated, (request, response) => {
    return listTransferController.handle(request, response);
});

router.get('/test', ensureAuthenticated, (request, response) => {
    return response.json({ message: "Hello World" })
});


export { router };

