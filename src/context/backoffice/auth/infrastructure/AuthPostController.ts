import {AuthRepository} from "../domain/AuthRepository";
import {UserLogin} from "../application/UserLogin";
import {PrismaAuthRepository} from "./PrismaAuthRepository";
import {Request, Response} from "express";

export class AuthPostController {
    private app: UserLogin;
    private repository: AuthRepository = new PrismaAuthRepository();

    constructor() {
        this.app = new UserLogin(this.repository);
    }

    async run(req: Request, res: Response) {
        return await this.app.run(req.body.email as string).then(() => {
            return res.status(200).send({
                "status": "ok",
                "message": "Success"
            });
        }).catch((err: Error) => res.status(400).send({
            "status": "error",
            "message": err.message
        }));
    }
}