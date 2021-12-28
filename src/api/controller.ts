import express from "express";
import basicAuth from "express-basic-auth";
import swaggerJsdoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";
import { config } from "../config";
import { errorResponse, notFound } from "../services";
import userController from "./userController";
import { apiDocumentation } from "./docs/apidoc";

const router = express.Router();
const v1 = "/v1";

// Routes
router.use(v1, userController);
router.use(v1, swaggerUi.serve);

// Error handler
router.use(errorResponse);

// Swagger
router.get(v1, basicAuth({
    challenge: true,
    users: config.api.secure.basicAuth.general
}), swaggerUi.setup(swaggerJsdoc(apiDocumentation)));

// Handle 404 error (ALWAYS Keep this as the last route)
router.use(notFound);

export default router;
