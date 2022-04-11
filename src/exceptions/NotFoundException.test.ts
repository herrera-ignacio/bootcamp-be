import NotFoundException from "./NotFoundException";

describe(
  "NotFoundException", () => {
    it(
      "Should have 404 status code", () => {
        const e = new NotFoundException();

        expect(e.status).toBe(404);
      },
    );

    it(
      "Should support customer message", () => {
        const e = new NotFoundException("My message");

        expect(e.message).toBe("My message");
      },
    );
  },
);
