import { Request, Response } from "express";

import { UserLogin } from "../application/UserLogin";
import { AuthRepository } from "../domain/AuthRepository";
import { PrismaAuthRepository } from "./PrismaAuthRepository";

export class AuthPostController {
	private readonly app: UserLogin;
	private readonly repository: AuthRepository = new PrismaAuthRepository();

	constructor() {
		this.app = new UserLogin(this.repository);
	}

	async run(req: Request, res: Response) {
		return await this.app
			.run(req.body.email as string)
			.then(() => {
				return res.status(200).send({
					status: "ok",
					message: "Success",
				});
			})
			.catch((err: Error) =>
				res.status(400).send({
					status: "error",
					message: err.message,
				}),
			);
	}
}
