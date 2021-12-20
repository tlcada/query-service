import { NextFunction, Request, Response } from "express";
import { ValidationChain, validationResult } from "express-validator";
import { getReasonPhrase, StatusCodes } from "http-status-codes";
import { development } from "../../environment/Profile";
import { MainException } from "../../exceptions";

type ResponseBody = {
    readonly message: string;
    readonly timestamp: string;
    readonly status: StatusCodes;
    readonly error: string;
    readonly path: string;
    trace?: string;
};

// Don't remove next because it causes hidden problems with next(...)
// eslint-disable-next-line @typescript-eslint/no-unused-vars
function errorResponse(error: MainException, req: Request, res: Response, next: NextFunction): void {
    res.status(error.getHttpStatus());

    const responseBody: ResponseBody = {
        message: error.message,
        timestamp: new Date().toISOString(),
        status: error.getHttpStatus(),
        error: getReasonPhrase(error.getHttpStatus()),
        path: req.originalUrl
    };

    if (development) {
        responseBody["trace"] = error.stack;
    }

    res.json(responseBody);
}

// Parallel processing
function validate(validations: ValidationChain[]): (req: Request, res: Response, next: NextFunction) => Promise<void> {
    return async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        await Promise.all(validations.map((validation: ValidationChain) => validation.run(req)));

        const errors = validationResult(req);
        if (errors.isEmpty()) {
            return next();
        }

        res.status(400);
        res.json({
            reason: "Validation error",
            errors: errors.array({ onlyFirstError: true })
        });
    };
}

// Don't remove next because it causes hidden problems with next(...)
// eslint-disable-next-line @typescript-eslint/no-unused-vars
function notFound(req: Request, res: Response, next: NextFunction): void {
    res.status(404).render("error", { title: 404, message: "The page you are looking for was not found." });
}

export { errorResponse, validate, notFound };
