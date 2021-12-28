import express from "express";
import { param } from "express-validator";
import { UserService, validate } from "../services";
import { LogBuilder, LogFormatter } from "../logger";

const userService = new UserService();
const router = express.Router();
const log = LogBuilder.create(module);

router.get("/user/:username", validate([
    param("username").exists().isString().trim().toLowerCase(),
]), async (req, res, next) => {
    const username = req.params.username as string;

    try {
        const userInformation = await userService.getUserByUsername(username);
        log.info(new LogFormatter("Fetched user information").username(username).write());
        res.json(userInformation);
    } catch (err: any) {
        log.error(new LogFormatter(err.message).write());
        return next(err);
    }
});

export default router;
