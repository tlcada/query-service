import LogFormatter from "../LogFormatter";

describe("LogFormatter.ts", () => {
    it("should create formatted JSON", async () => {
        const formattedJSON = new LogFormatter("test message")
            .username("john.smith")
            .write();

        expect(formattedJSON).toEqual({
            "message": "Test message.",
            "username": "john.smith"
        });
    });
});
