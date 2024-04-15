import { Request, Response } from "express";

import { UserValidation } from "../application/UserValidation";
import { AuthException } from "../domain/AuthException";
import { AuthRepository } from "../domain/AuthRepository";
import { PrismaAuthRepository } from "./PrismaAuthRepository";

export class AuthValidationPostController {
	private readonly app: UserValidation;
	private readonly repository: AuthRepository = new PrismaAuthRepository();

	constructor() {
		this.app = new UserValidation(this.repository);
	}

	// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
	async run(req: Request, res: Response) {
		const userId: string = req.params.id;
		const token: string = req.params.token;

		return await this.app
			.run(token, userId)
			.then(() => {
				return res.status(200).send({
					status: "ok",
					message: "Successful login",
				});
			})
			.catch((err) => {
				if (err instanceof AuthException) {
					return res.status(err.code).send({
						status: "error",
						message: err.message,
					});
				}

				return res.status(500).send({
					status: "error",
					message: "Internal server error",
				});
			});
	}
}
