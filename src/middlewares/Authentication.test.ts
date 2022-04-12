import sinon from "sinon";
import { AuthenticationMiddleware } from "./Authentication";
import getRequestMock from "../mocks/RequestMock";
import NotAuthenticatedException from "../exceptions/NotAuthenticatedException";
import {
  AuthData,
  RequestWithAuth,
} from "../types/Auth/RequestWithAuth";
import getUserMock from "../mocks/UserMock";
import UserService from "../services/UserService";
import NotFoundException from "../exceptions/NotFoundException";

describe(
  "AuthenticationMiddleware", () => {
    const sandbox = sinon.createSandbox();

    afterEach(() => sandbox.restore());

    it(
      // Given
      "Should throw if no auth data provided", async () => {
        // Given
        const middleware = new AuthenticationMiddleware().use();
        const req = getRequestMock<RequestWithAuth>();
        const next = sandbox.stub();

        // When no auth data provided

        // Then
        await expect(middleware(
          req, null, next,
        ))
          .rejects
          .toThrow(NotAuthenticatedException);
        expect(next.notCalled).toBeTruthy();
      },
    );

    it(
      "Should throw if user is not found", async () => {
        // Given
        const fakeUserService = sinon.createStubInstance(UserService);
        const middleware = new AuthenticationMiddleware(
          null, fakeUserService,
        ).use();
        const req = getRequestMock<RequestWithAuth>({ auth: { sub: "test" } as AuthData });
        const next = sandbox.stub();

        // When
        fakeUserService.getByKey.throws(new NotFoundException());

        // Then
        await expect(middleware(
          req, null, next,
        ))
          .rejects
          .toThrow(NotAuthenticatedException);
        expect(next.notCalled).toBeTruthy();
      },
    );

    it(
      "Should populate user data if succeeds", async () => {
        const userMock = getUserMock();
        // Given
        const fakeUserService = sinon.createStubInstance(UserService);
        const middleware = new AuthenticationMiddleware(
          null, fakeUserService,
        ).use();
        const req = getRequestMock<RequestWithAuth>({ auth: { sub: "test" } as AuthData });
        const next = sandbox.stub();

        // When
        fakeUserService.getByKey.resolves(userMock);
        await middleware(
          req, null, next,
        );

        // Then
        expect(req.auth.user).toEqual(userMock);
        expect(req.auth.isAuthenticated).toBe(true);
        expect(next.calledOnce).toBeTruthy();
      },
    );
  },
);
