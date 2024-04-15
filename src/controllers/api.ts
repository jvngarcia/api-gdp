import { Application } from "express";

import { authController } from "./AuthController";

export const loadApiEndpoints = (app: Application): void => {
	authController(app, "api/v1/auth");
};
