import { StatusCodes } from "http-status-codes";
import MainException from "./MainException";

export default class EmptyResultsException extends MainException {

    constructor() {
        super("No search results found");
    }

    getHttpStatus(): StatusCodes {
        return StatusCodes.NOT_FOUND;
    }
}
