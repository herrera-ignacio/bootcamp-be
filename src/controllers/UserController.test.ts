import sinon from "sinon";
import UserController from "./UserController";
import getUserMock from "../mocks/UserMock";
import getRequestMock from "../mocks/RequestMock";
import getResponseMock from "../mocks/ResponseMock";
import UserService from "../services/UserService";
import { UserMapper } from "../mappers/UserMapper";
import NotFoundException from "../exceptions/NotFoundException";
import User from "../entities/User";
import {
  UserCreateBody,
  UserCreateRequest,
} from "../types/User/UserCreateRequest";
import { UserUpdateBody } from "../types/User/UserUpdateRequest";


describe(
  "UserController", () => {
    const sandbox = sinon.createSandbox();

    afterEach(() => sandbox.restore());

    /* Test for getById endpoint */

    it(
      "getById should return 200 and user on success and found user", async () => {
        // Given
        const userMock = getUserMock();
        const fakeService = sinon.createStubInstance(UserService);
        const fakeReq = getRequestMock({ params: { id: "1" } } );
        const fakeRes = getResponseMock();
        const controller = new UserController(fakeService);

        // When

        fakeService.getByKey.resolves(userMock);

        await controller.getById(
          fakeReq, fakeRes as any, null,
        );

        // Then

        expect(fakeService.getByKey.calledOnceWithExactly(
          "id", userMock.id,
        )).toBeTruthy();
        expect(fakeRes.json.calledOnceWithExactly({
          data: new UserMapper().toDto(userMock),
        })).toBeTruthy();
        expect(fakeRes.status.calledOnceWithExactly(200)).toBeTruthy();

      },
    );

    it(
      "getById should bubble up exception", async () => {
        // Given
        const fakeService = sinon.createStubInstance(UserService);
        const fakeReq = getRequestMock({ params: { id: "1" } });
        const fakeRes = getResponseMock();
        const controller = new UserController(fakeService);

        // When
        fakeService.getByKey.throws(new NotFoundException());

        // Then
        await expect(controller.getById(
          fakeReq, fakeRes as any, null,
        )).rejects.toThrow(NotFoundException);
        expect(fakeService.getByKey.calledOnceWithExactly(
          "id", 1,
        )).toBeTruthy();
      },
    );

    it(
      "create should return 201 status code and user on success", async () => {
        // Given
        const userMock = getUserMock();
        const fakeService = sinon.createStubInstance(UserService);
        const userCreateBody: UserCreateBody = {
          email    : userMock.email,
          firstName: userMock.firstName,
          lastName : userMock.lastName,
          role     : userMock.role,
        };
        const fakeReq: UserCreateRequest = getRequestMock({
          body: userCreateBody,
        });
        const fakeRes = getResponseMock();
        const controller = new UserController(fakeService);

        // When
        fakeService.create.resolves(userMock);

        await controller.create(
          fakeReq, fakeRes as any, null,
        );

        // Then
        expect(fakeService.create.calledOnceWithExactly(userCreateBody)).toBeTruthy();
        expect(fakeRes.json.calledOnceWithExactly({ data: new UserMapper().toDto(userMock) }))
          .toBeTruthy();
        expect(fakeRes.status.calledOnceWithExactly(201)).toBeTruthy();
      },
    );

    it(
      "create should should bubble up exception", async () => {
        // Given
        const fakeService = sinon.createStubInstance(UserService);
        const fakeReq = getRequestMock({});
        const fakeRes = getResponseMock();
        const controller = new UserController(fakeService);

        // When
        fakeService.create.throws();

        // Then
        await expect(controller.create(
          fakeReq, fakeRes as any, null,
        )).rejects.toThrow();
        expect(fakeService.create.calledOnce).toBeTruthy();
      },
    );

    it(
      "updateById should return 200 and user on success", async () => {
        // Given
        const userUpdateBody: UserUpdateBody = { email: "new@example.com" };
        const expectedUser = {
          ...getUserMock(),
          ...userUpdateBody,
        } as User;
        const fakeService = sinon.createStubInstance(UserService);
        const fakeReq: UserCreateRequest = getRequestMock({
          body  : userUpdateBody,
          params: { id: "1" },
        });
        const fakeRes = getResponseMock();
        const controller = new UserController(fakeService);

        // When
        fakeService.updateById.resolves(expectedUser);

        await controller.updateById(
          fakeReq, fakeRes as any, null,
        );

        // Then
        expect(fakeService.updateById.calledOnceWithExactly(
          Number(fakeReq.params.id), userUpdateBody,
        )).toBeTruthy();
        expect(fakeRes.json.calledOnceWithExactly({ data: new UserMapper().toDto(expectedUser) }))
          .toBeTruthy();
        expect(fakeRes.status.calledOnceWithExactly(200)).toBeTruthy();
      },
    );

    it(
      "updateById should bubble up exception", async () => {
        // Given
        const userUpdateBody: UserUpdateBody = { email: "new@example.com" };
        const fakeService = sinon.createStubInstance(UserService);
        const fakeReq = getRequestMock({
          body  : userUpdateBody,
          params: { id: "1" },
        });
        const fakeRes = getResponseMock();
        const controller = new UserController(fakeService);

        // When
        fakeService.updateById.throws();

        // Then
        await expect(controller.updateById(
          fakeReq, fakeRes as any, null,
        )).rejects.toThrow();
        expect(fakeService.updateById.calledOnceWithExactly(
          Number(fakeReq.params.id), userUpdateBody,
        )).toBeTruthy();
      },
    );


    /* Test for delete endpoint */

    it(
      "deleteById should return 204 status on success", async () => {
        // Given

        const fakeService = sinon.createStubInstance(UserService);
        const fakeReq = getRequestMock({ params: { id: "1" } });
        const fakeRes = getResponseMock();
        const controller = new UserController(fakeService);


        // When

        fakeService.deleteById.throws(new NotFoundException());

        // Then

        await expect(controller.deleteById(
          fakeReq, fakeRes as any, null,
        )).rejects.toThrow(NotFoundException);
        expect(fakeService.deleteById.
          calledOnceWithExactly(Number(fakeReq.params.id))).toBeTruthy();

      },
    );

    it(
      "deleteById should bubble up exception", async () => {
        // Given
        const fakeService = sinon.createStubInstance(UserService);
        const fakeReq = getRequestMock({ params: { id: "1" } });
        const fakeRes = getResponseMock();
        const controller = new UserController(fakeService);

        // When
        fakeService.deleteById.throws(new NotFoundException());

        // Then
        await expect(controller.deleteById(
          fakeReq, fakeRes as any, null,
        )).rejects.toThrow(NotFoundException);
        expect(fakeService.deleteById.
          calledOnceWithExactly(Number(fakeReq.params.id))).toBeTruthy();
      },
    );
  },
);
