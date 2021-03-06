/* eslint-disable @typescript-eslint/no-explicit-any */
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
import NotFoundException from "../exceptions/NotFoundException";
import { RoomUpdateBody } from "../types/Room/RoomUpdateRequest";
import Room from "../entities/Room";

describe(
  "RoomController", () => {

    const sandbox = sinon.createSandbox();

    afterEach(() => sandbox.restore());

    it(
      "getAll should return 200 and get a list of all rooms", async () => {
        // Given
        const roomsMock = [ getRoomMock(), getRoomMock(), getRoomMock() ];
        const fakeService = sinon.createStubInstance(RoomService);
        const fakeReq = getRequestMock();
        const fakeRes = getResponseMock();
        const controller = new RoomController(fakeService);

        // When
        fakeService.getAll.resolves(roomsMock);

        await controller.getAll(
          fakeReq, fakeRes as any, null,
        );

        // Then
        expect(fakeService.getAll.called).toBeTruthy();
        expect(fakeRes.json.calledWith(sinon.match({
          data: roomsMock.map((room) => new RoomMapper().toDto(room)),
        }))).toBeTruthy();
        expect(fakeRes.status.calledOnceWithExactly(200)).toBeTruthy();
      },
    );

    it(
      "getAll should bubble up exception", async () => {
        // Given
        const fakeService = sinon.createStubInstance(RoomService);
        const fakeReq = getRequestMock();
        const fakeRes = getResponseMock();
        const controller = new RoomController(fakeService);

        // When
        fakeService.getAll.throws();

        // Then
        await expect(controller.getAll(
          fakeReq, fakeRes as any, null,
        )).rejects.toThrow();
        expect(fakeService.getAll.calledOnce).toBeTruthy();
      },
    );

    it(
      "getById should return 200 and room on success", async () => {
        // Given
        const roomMock = getRoomMock();
        const fakeService = sinon.createStubInstance(RoomService);
        const fakeReq = getRequestMock( { params: { id: "1" } } );
        const fakeRes = getResponseMock();
        const controller = new RoomController(fakeService);

        // When
        fakeService.getByKey.resolves(roomMock);

        // Then
        await controller.getById(
          fakeReq,
          fakeRes as any,
          null,
        );

        expect(fakeService.getByKey.calledOnceWithExactly(
          "id", roomMock.id,
        )).toBeTruthy();
        expect(fakeRes.json.calledOnceWithExactly({
          data: new RoomMapper().toDto(roomMock),
        })).toBeTruthy();

        expect(fakeRes.status.calledOnceWithExactly(200)).toBeTruthy();


      },
    );

    it(
      "getById should bubble up exception", async () => {
        // Given
        const fakeService = sinon.createStubInstance(RoomService);
        const fakeReq = getRequestMock( { params: { id: "1" } } );
        const fakeRes = getResponseMock();
        const controller = new RoomController(fakeService);

        // when

        fakeService.getByKey.throws(new NotFoundException());

        await expect(controller.getById(
          fakeReq,
          fakeRes as any,
          null,
        )).rejects.toThrow(NotFoundException);
        expect(fakeService.getByKey.calledOnceWithExactly(
          "id",
          1,
        )).toBeTruthy();
      },

    );

    it(
      "create should return 201 and room on success", async () => {
        // Given
        const roomMock = getRoomMock();
        const fakeService = sinon.createStubInstance(RoomService);
        const roomCreateBody: RoomCreateBody = {
          createdAt : roomMock.createdAt,
          isDisabled: roomMock.isDisabled,
          name      : roomMock.name,
          updatedAt : roomMock.updatedAt,
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

    it(
      "UpdateById should return 200 and room on success", async () => {

        // Given
        const roomUpdateBody: RoomUpdateBody = {
          isDisabled: true,
          name      : "Dummy room",
        };

        const expectedRoom = {
          ...getRoomMock(),
          ...roomUpdateBody,
        } as Room;

        const fakeService = sinon.createStubInstance(RoomService);
        const fakeReq: RoomCreateRequest = getRequestMock({
          body  : roomUpdateBody,
          params: { id: "1" },
        });

        const fakeRes = getResponseMock();
        const controller = new RoomController(fakeService);

        // When

        fakeService.updateById.resolves(expectedRoom);

        await controller.updateById(
          fakeReq, fakeRes as any, null,
        );

        // Then

        expect(fakeService.updateById.calledOnceWithExactly(
          Number(fakeReq.params.id), roomUpdateBody,
        )).toBeTruthy();

        expect(fakeRes.json.calledOnceWithExactly({
          data: new RoomMapper().toDto(expectedRoom),
        })).toBeTruthy();

        expect(fakeRes.status.calledOnceWithExactly(200)).toBeTruthy();


      },
    );

    it(
      "updateById should bubble up exception", async () => {

        // Given

        const roomUpdateBody: RoomUpdateBody = {
          isDisabled: true,
          name      : "Dummy room",
        };
        const fakeService = sinon.createStubInstance(RoomService);
        const fakeReq = getRequestMock({
          body  : roomUpdateBody,
          params: { id: "1" },
        });

        // When
        const fakeRes = getResponseMock();
        const controller = new RoomController(fakeService);

        fakeService.updateById.throws();

        // Then
        await expect(controller.updateById(
          fakeReq, fakeRes as any, null,
        )).rejects.toThrow();
        expect(fakeService.updateById.calledOnceWithExactly(
          Number(fakeReq.params.id), roomUpdateBody,
        )).toBeTruthy();
      },

    );

    it(
      "deleteById should return 204 on success", async () => {
        // Given
        const fakeService = sandbox.createStubInstance(RoomService);
        const fakeReq = getRequestMock({ params: { id: "1" } });
        const fakeRes = getResponseMock();
        const controller = new RoomController(fakeService);

        // When
        fakeService.deleteById.resolves();

        await controller.deleteById(
          fakeReq, fakeRes as any, null,
        );

        // Then
        expect(fakeService.deleteById.calledOnceWithExactly(Number(fakeReq.params.id)))
          .toBeTruthy();
        expect(fakeRes.sendStatus.calledOnceWithExactly(204)).toBeTruthy();
      },
    );

    it(
      "deleteById should bubble up exception", async () => {

        // Given

        const fakeService = sinon.createStubInstance(RoomService);
        const fakeReq = getRequestMock({ params: { id: "1" } });
        const fakeRes = getResponseMock();
        const controller = new  RoomController(fakeService);

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
