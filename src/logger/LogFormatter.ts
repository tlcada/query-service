import { SnippetUtils } from "../utils";

type JSONBuilder = {
    message?: string;
    username?: string;
};

class LogFormatter {

    private jsonBuilder: JSONBuilder = {};

    constructor(message: string) {
        const lastChar: string = message.slice(-1);
        message = (lastChar !== ".") ? message.concat(".") : message;
        this.jsonBuilder["message"] = SnippetUtils.uppercaseFirstLetter(message).trim();
    }

    public username(username: string): LogFormatter {
        this.jsonBuilder["username"] = username;
        return this;
    }

    public write(): JSONBuilder {
        return this.jsonBuilder;
    }
}

export default LogFormatter;
