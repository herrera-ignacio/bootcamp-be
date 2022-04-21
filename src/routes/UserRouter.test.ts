/* eslint-disable max-nested-callbacks */
import sinon from "sinon";
import request from "supertest";
import express, { Request } from "express";
import UserController from "../controllers/UserController";
import UserRouter from "./UserRouter";
import BaseParamsValidator from "../validators/BaseParamsValidator";
import { AuthenticationMiddleware } from "../middlewares/Authentication";
import dummyMiddleware from "../mocks/dummyMiddleware";
import { JWTCheckMiddleware } from "../middlewares/JWTCheck";

describe(
  "UserRouter", () => {
    const sandbox = sinon.createSandbox();
    const app = express();

    afterEach(() => sandbox.restore());

    describe(
      "Get /:id", () => {
        it(
          "Should call middlewares (validator, jwt & auth check)", async () => {
            // Given
            const fakeController = sandbox.createStubInstance(UserController);
            let reqSpy: Request;

            fakeController.getById.callsFake((
              req, res,
            ) => {
              reqSpy = req;
              res.sendStatus(200);
              return Promise.resolve();
            });

            const paramsValidatorStub = sandbox.stub(
              UserRouter, "paramsValidator",
            )
              .callsFake(() => dummyMiddleware);

            const jwtCheckStub = sandbox.stub(
              JWTCheckMiddleware.prototype, "use",
            ).callsFake(() => dummyMiddleware);

            const authStub = sandbox.stub(
              AuthenticationMiddleware.prototype, "use",
            )
              .callsFake(() => dummyMiddleware);

            const userRouter = new UserRouter(fakeController);

            // When
            userRouter.setGetByIdRoute();
            app.use(userRouter.router);
            const res = await request(app).get("/users/1");

            // The
            expect(paramsValidatorStub.calledOnceWithExactly(BaseParamsValidator)).toBeTruthy();
            expect(jwtCheckStub.calledOnce).toBeTruthy();
            expect(authStub.calledOnce).toBeTruthy();
            expect(fakeController.getById.calledOnce).toBeTruthy();
            expect(reqSpy.params.id).toBe("1");
            expect(res.statusCode).toBe(200);
          },
        );
      },
    );
  },
);
