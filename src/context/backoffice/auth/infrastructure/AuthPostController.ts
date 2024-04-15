import { Request, Response } from "express";

import { UserLogin } from "../application/UserLogin";
import { AuthException } from "../domain/AuthException";
import { AuthRepository } from "../domain/AuthRepository";
import { PrismaAuthRepository } from "./PrismaAuthRepository";

export class AuthPostController {
	private readonly app: UserLogin;
	// eslint-disable-next-line @typescript-eslint/ban-ts-comment
	// @ts-ignore
	private readonly repository: AuthRepository = new PrismaAuthRepository();

	constructor() {
		this.app = new UserLogin(this.repository);
	}

	// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
	async run(req: Request, res: Response) {
		// eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
		const email: string = req.body.email as string;

		return await this.app
			.run(email)
			.then(() => {
				return res.status(200).send({
					status: "ok",
					message: "An email has been sent with the login code",
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
