import HttpException from "./HttpException";

describe(
  "HttpException", () =>{
    it(
      "Should have 500 status code and message by default",  () =>{
        const e = new HttpException(500, "Something went wrong!");

        expect(e.status).toBe(500);
        expect(e.message).toBe("Something went wrong!");
      }, 
    );

    it(
      "Should support custom status", () =>{
        const e = new HttpException(400, "My message");
        
        expect(e.status).toBe(400);
      },
    );

    it(
      "Should support custom message", () =>{
        const e = new HttpException(400, "My message");

        expect(e.message).toBe("My message");
      },
    );

    
  },
);