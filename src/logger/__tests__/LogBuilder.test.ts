import { LogBuilder } from "../../logger";
import LogFormatter from "../LogFormatter";

const log = LogBuilder.create(module);

describe("logger.ts", () => {
    it("should write an error message to the file", async () => {
        expect(() => log.error(new LogFormatter("Test message").username("john").write())).not.toThrow(TypeError);
    });
});
