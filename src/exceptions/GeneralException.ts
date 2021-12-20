import { StatusCodes } from "http-status-codes";
import MainException from "./MainException";

export default class GeneralException extends MainException {

    private static DEFAULT_MESSAGE = "Something unexpected happened. Please try again.";

    constructor(message?: string) {
        super(message || GeneralException.DEFAULT_MESSAGE);
    }

    getHttpStatus(): StatusCodes {
        return StatusCodes.INTERNAL_SERVER_ERROR;
    }
}
