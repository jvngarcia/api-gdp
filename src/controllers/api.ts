import {Application, Request, Response} from "express";

import CoursesData from "../../data/courses.json";
import {AuthPostController} from "../context/backoffice/auth/infrastructure/AuthPostController";
import {authController} from "./AuthController";

export const loadApiEndpoints = (app: Application): void => {
    authController(app, "api/v1/auth");
};
