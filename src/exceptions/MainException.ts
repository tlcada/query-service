import { StatusCodes } from "http-status-codes";

export default abstract class MainException extends Error {

    protected constructor(message: string) {
        super(message);
    }

    abstract getHttpStatus(): StatusCodes;
}
