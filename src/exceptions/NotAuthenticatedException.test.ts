import NotAuthenticatedException from "./NotAuthenticatedException";

describe(
  "NotAuthenticatedException", () => {

    it(
      "Should have 401 status code", () => {
        const e = new NotAuthenticatedException();

        expect(e.status).toBe(401);
      },

    );

    it(
      "Should support custom message", () => {
        const e = new NotAuthenticatedException("My message");

        expect(e.message).toBe("My message");
      },
    );

  },
);
