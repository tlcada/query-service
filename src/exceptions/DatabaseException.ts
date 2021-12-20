import { StatusCodes } from "http-status-codes";
import MainException from "./MainException";

export default class DatabaseException extends MainException {

    constructor(message: string) {
        super(message);
    }

    getHttpStatus(): StatusCodes {
        return StatusCodes.INTERNAL_SERVER_ERROR;
    }
}
