import { Application, Request, Response } from "express";

import { AuthPostController } from "../context/backoffice/auth/infrastructure/AuthPostController";
import { AuthValidationPostController } from "../context/backoffice/auth/infrastructure/AuthValidationPostController";

export const authController = (app: Application, prefix: string): void => {
	const authPostController: AuthPostController = new AuthPostController();
	const authValidationPostController: AuthValidationPostController =
		new AuthValidationPostController();

	// eslint-disable-next-line @typescript-eslint/no-misused-promises
	app.post(`/${prefix}/login`, (req: Request, res: Response) => authPostController.run(req, res));
	// eslint-disable-next-line @typescript-eslint/no-misused-promises
	app.post(`/${prefix}/login/validation/:id/:token`, (req: Request, res: Response) =>
		authValidationPostController.run(req, res),
	);
};
