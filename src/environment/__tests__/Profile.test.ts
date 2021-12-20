import { development, Env, production, staging } from "../Profile";

describe("Profile.ts", () => {
    it("should match", () => {
        if (production) {
            expect(Env).toEqual("production");
        } else if (staging) {
            expect(Env).toEqual("staging");
        } else if (development) {
            expect(Env).toEqual("development");
        } else {
            expect(Env).toEqual("test");
        }
    });
});
