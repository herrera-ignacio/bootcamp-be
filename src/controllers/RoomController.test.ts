// noinspection JSVoidFunctionReturnValueUsed
import sinon from "sinon";
import getRoomMock from "../mocks/RoomMock";
import getRequestMock from "../mocks/RequestMock";
import getResponseMock from "../mocks/ResponseMock";
import {
  RoomCreateBody,
  RoomCreateRequest,
} from "../types/Room/RoomCreateRequest";
import RoomService from "../services/RoomService";
import RoomController from "./RoomController";
import { RoomMapper } from "../mappers/RoomMapper";

describe(
  "RoomController", () => {

    const sandbox = sinon.createSandbox();

    afterEach(() => sandbox.restore());


    it(
      "create should return 201 and room on success", async () => {
        // Given
        const roomMock = getRoomMock();
        const fakeService = sinon.createStubInstance(RoomService);
        const roomCreateBody: RoomCreateBody = {
          createdAt: roomMock.createdAt,
          name     : roomMock.name,
          updatedAt: roomMock.updatedAt,
        };
        const fakeReq: RoomCreateRequest = getRequestMock({
          body: roomCreateBody,
        });
        const fakeRes = getResponseMock();

        const controller = new RoomController(fakeService);

        // When
        fakeService.create.resolves(roomMock);

        await controller.create(
          fakeReq, fakeRes as any, null,
        );

        // Then

        expect(fakeService.create.calledOnceWithExactly(roomCreateBody)).toBeTruthy();
        expect(fakeRes.json.calledOnceWithExactly({
          data: new RoomMapper().toDto(roomMock),
        })).toBeTruthy();

        expect(fakeRes.status.calledOnceWithExactly(201)).toBeTruthy();
      },

    );

    it(
      "Create should bubble up exception", async () => {
        // Given
        const fakeService = sinon.createStubInstance(RoomService);
        const fakeReq = getRequestMock({});
        const fakeRes = getResponseMock();
        const controller = new RoomController(fakeService);


        // When
        fakeService.create.throws();

        // Then
        await expect(controller.create(
          fakeReq,
          fakeRes as any,
          null,
        )).rejects.toThrow();
        expect(fakeService.create.calledOnce).toBeTruthy();

      },
    );
  },
);
