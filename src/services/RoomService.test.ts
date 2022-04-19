import sinon from "sinon";
import { stubInterface } from "ts-sinon";
import Room  from "../entities/Room";
import getRoomMock from "../mocks/RoomMock";
import IRepository from "../types/IRepository";
import RoomService from "./RoomService";


describe(
  "RoomService", () => {
    const sandbox = sinon.createSandbox();

    afterEach(() => sandbox.restore());

    it(
      "getAll should return an array of all rooms when called", async () => {
        // Given
        const roomMocks = [ getRoomMock(), getRoomMock(), getRoomMock() ];
        const fakeRepo = stubInterface<IRepository<Room>>();

        // When
        fakeRepo.find.resolves(roomMocks);
        sandbox.replace(
          RoomService.prototype, "getRepository", () => fakeRepo,
        );

        // Then
        const res = await new RoomService().getAll();

        expect(fakeRepo.find.called).toBeTruthy();
        expect(res).toEqual(roomMocks);
      },
    );

    it(
      "create success", async () => {
        const roomMock = getRoomMock();
        const fakeRepo = stubInterface<IRepository<Room>>();
        const userInput = {
          name: roomMock.name,
        };

        // When
        fakeRepo.save.resolves(roomMock);
        sandbox.replace(
          RoomService.prototype, "getRepository", () => fakeRepo,
        );

        // Then
        const res = await new RoomService().create(userInput);

        expect(fakeRepo.save.calledOnceWithExactly(userInput)).toBeTruthy();
        expect(res).toEqual(roomMock);

      },

    );

  },
);
