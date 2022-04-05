import sinon from "sinon";
import UserController from "./UserController";
import getUserMock from "../mocks/UserMock";
import getRequestMock from "../mocks/RequestMock";
import getResponseMock from "../mocks/ResponseMock";
import UserService from "../services/UserService";
import { UserMapper } from "../mappers/UserMapper";
import NotFoundException from "../exceptions/NotFoundException";
// import User from "../entities/User";
// import { UserCreateBody, UserCreateRequest } from "../types/User/UserCreateRequest";
// import { UserUpdateRequest } from "../types/User/UserUpdateRequest";


describe(
  "UserController", ()=>{
    const sandbox = sinon.createSandbox();

    afterEach(() => sandbox.restore());

    /* Test for getById endpoint */

    it(
      "getById should return 200 and user on success and found user", async () =>{
        // Given
        const userMock = getUserMock();
        const fakeService = sinon.createStubInstance(UserService);
        const fakeReq = getRequestMock({ params: { id:"13" } } );
        const fakeRes = getResponseMock();
        const controller = new UserController(fakeService);

        // When

        fakeService.getById.resolves(userMock);

        await controller.getById(fakeReq, fakeRes as any, null);

        // Then

        expect(fakeService.getById.calledOnceWithExactly(userMock.id)).toBeTruthy();
        expect(fakeRes.json.calledOnceWithExactly({ data: new UserMapper().toDto(userMock) })).toBeTruthy();
        expect(fakeRes.status.calledOnceWithExactly(200)).toBeTruthy();

      },
    );


    /* Test for delete endpoint */

    it(
      "deleteById should return 204 status and bubble up", async () =>{
        // Given 

        const fakeService = sinon.createStubInstance(UserService);
        const fakeReq = getRequestMock({ params: { id:"13" } });
        const fakeRes = getResponseMock();
        const controller = new UserController(fakeService);


        // When

        fakeService.deleteById.throws(new NotFoundException());

        // Then

        await expect(controller.deleteById( fakeReq, fakeRes as any, null )).rejects.toThrow(NotFoundException);
        expect(fakeService.deleteById.calledOnceWithExactly(Number(fakeReq.params.id))).toBeTruthy();

      },
    );





  },
);