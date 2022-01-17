import { StatusCodes } from "http-status-codes";
import MainException from "./MainException";

type Message = {
    readonly own: string;
    readonly rawError: string;
};

export default class DatabaseException extends MainException {
    readonly rawError: string;

    constructor(message: Message) {
        super(message.own);
        this.rawError = message.rawError;
    }

    getRawError(): string {
        return this.rawError;
    }

    getHttpStatus(): StatusCodes {
        return StatusCodes.INTERNAL_SERVER_ERROR;
    }
}
