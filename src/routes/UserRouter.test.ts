/* eslint-disable max-nested-callbacks */
import sinon from "sinon";
import request from "supertest";
import express from "express";
import UserController from "../controllers/UserController";
import UserRouter from "./UserRouter";
import BaseParamsValidator from "../validators/BaseParamsValidator";
import { AuthenticationMiddleware } from "../middlewares/Authentication";
import dummyMiddleware from "../mocks/dummyMiddleware";
import { JWTCheckMiddleware } from "../middlewares/JWTCheck";
import DummyController from "../mocks/dummyController";
import NotAuthenticatedException from "../exceptions/NotAuthenticatedException";
import ErrorHandler from "../middlewares/ErrorHandler";

describe(
  "UserRouter", () => {
    const sandbox = sinon.createSandbox();
    let app = express();

    afterEach(() => {
      sandbox.restore();
      app = express(); // Recreate to clean middlewares
    });

    describe(
      "Get /:id", () => {
        it(
          "Should call middlewares (validator, jwt & auth check)", async () => {
            // Given
            const controllerStub = sandbox.stub(
              UserController.prototype, "getById",

            ).callsFake(new DummyController(200).getCallback());

            const paramsValidatorStub = sandbox.stub(
              UserRouter, "paramsValidator",
            )
              .returns(dummyMiddleware);

            const jwtCheckStub = sandbox.stub(
              JWTCheckMiddleware.prototype, "use",
            ).returns(dummyMiddleware);

            const authStub = sandbox.stub(
              AuthenticationMiddleware.prototype, "use",
            )
              .returns(dummyMiddleware);

            const userRouter = new UserRouter();

            // When
            userRouter.setGetByIdRoute();
            app.use(userRouter.router);
            const res = await request(app).get("/users/1");

            // The
            expect(paramsValidatorStub.calledOnceWithExactly(BaseParamsValidator)).toBeTruthy();
            expect(jwtCheckStub.calledOnce).toBeTruthy();
            expect(authStub.calledOnce).toBeTruthy();
            expect(controllerStub.calledOnce).toBeTruthy();
            expect(controllerStub.getCall(0).firstArg.params.id).toBe("1");
            expect(res.statusCode).toBe(200);
          },
        );

        it(
          "Should not proceed if auth middleware fails", async () => {
            // Given
            const controllerStub = sandbox.stub(
              UserController.prototype, "getById",

            ).callsFake(new DummyController().getCallback());

            const paramsValidatorStub = sandbox.stub(
              UserRouter, "paramsValidator",
            )
              .returns(dummyMiddleware);

            const jwtCheckStub = sandbox.stub(
              JWTCheckMiddleware.prototype, "use",
            ).returns(dummyMiddleware);

            const authStub = sandbox.stub(
              AuthenticationMiddleware.prototype, "use",
            )
              .returns(() => { throw new NotAuthenticatedException(); });


            // When
            const userRouter = new UserRouter();

            userRouter.setGetByIdRoute();
            app.use(userRouter.router);
            ErrorHandler.mount(app);

            const res = await request(app).get("/users/1");

            // Then
            expect(res.status).toBe(401);
            expect(paramsValidatorStub.calledOnceWithExactly(BaseParamsValidator)).toBeTruthy();
            expect(jwtCheckStub.calledOnce).toBeTruthy();
            expect(authStub.calledOnce).toBeTruthy();
            expect(controllerStub.calledOnce).toBeFalsy();
          },
        );
      },
    );
  },
);
