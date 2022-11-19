import { NextFunction, Request, Response } from "express";
import { verify } from "jsonwebtoken";
import { config } from "../config/config";

export function ensureAuthenticated(request: Request, response: Response, next: NextFunction) {

    const authToken = request.headers.authorization;

    if (!authToken) {
        return response.status(401).json({
            message: "Token missing"
        });
    }

    if(/^Bearer$/i.test(authToken)) {
        return response.status(401).json({
            message: "Token malformatted"
        });
    }

    const [, token] = authToken.split(" ");

    try {
        verify(token, config.SECRET_KEY);
        return next();
    } catch (err) {
        return response.status(401).json({
            message: "Invalid token"
        });
    }

}
