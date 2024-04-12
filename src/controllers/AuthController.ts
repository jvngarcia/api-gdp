import {Application, Request, Response} from "express";
import {AuthPostController} from "../context/backoffice/auth/infrastructure/AuthPostController";


export const authController = (app: Application, prefix: string): void => {
    const authPostController: AuthPostController = new AuthPostController();

    app.post(`/${prefix}/login`, (_: Request, res: Response) => authPostController.run(_, res));
};