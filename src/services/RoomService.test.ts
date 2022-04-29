import sinon from "sinon";
import { stubInterface } from "ts-sinon";
import NotFoundException from "../exceptions/NotFoundException";
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
      "getById success", async () => {
      // Given
        const roomMock = getRoomMock();
        const fakeRepo = stubInterface<IRepository<Room>>();

        // When
        fakeRepo.findOneBy.resolves(roomMock);
        sandbox.replace(
          RoomService.prototype, "getRepository", () => fakeRepo,
        );

        // Then

        const res = await  new RoomService().getByKey(
          "id", roomMock.id,
        );

        expect(fakeRepo.findOneBy.calledOnceWithExactly({ id: roomMock.id })).toBeTruthy();
        expect(res).toEqual(roomMock);


      },

    );

    it(
      "getById Not Found", async () => {
        // Given
        const fakeRepo = stubInterface<IRepository<Room>>();

        // When

        fakeRepo.findOneBy.resolves(null);
        sandbox.replace(
          RoomService.prototype, "getRepository", () => fakeRepo,
        );

        const roomService = new RoomService();


        // Then

        await expect(roomService.getByKey(
          "id",
          999,
        )).rejects.toThrow(NotFoundException);

        expect(fakeRepo.findOneBy.calledOnceWithExactly({ id: 999 })).toBeTruthy();
      },

    );

    it(
      "create success", async () => {
        const roomMock = getRoomMock();
        const fakeRepo = stubInterface<IRepository<Room>>();
        const userInput = {
          isDisabled: roomMock.isDisabled,
          name      : roomMock.name,
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

    it(
      "updateById success", async () => {
        // Given
        const roomMock = getRoomMock();
        const fakeRepo = stubInterface<IRepository<Room>>();
        const expectedRoom = {
          ...roomMock,
          name: "Dummy room",
        };
        const getByKey = sinon.fake.resolves(roomMock);

        // When
        fakeRepo.save.resolvesArg(0);
        sandbox.replace(
          RoomService.prototype, "getByKey", getByKey,
        );
        sandbox.replace(
          RoomService.prototype, "getRepository", () => fakeRepo,
        );

        const res = await new RoomService().updateById(
          roomMock.id, { name: expectedRoom.name },
        );

        // Then

        expect(getByKey.calledOnceWithExactly(
          "id", roomMock.id,
        )).toBeTruthy();
        expect(fakeRepo.save.calledOnceWithExactly({
          ...roomMock,
          name: expectedRoom.name,
        })).toBeTruthy();
        expect(res).toEqual(expectedRoom);
      },
    );

    it(
      "updateById not found", async () => {
        // Given

        const getByKey = sinon.fake.throws(new NotFoundException(""));

        // When

        sandbox.replace(
          RoomService.prototype, "getByKey", getByKey,
        );

        const roomService = new RoomService();

        // Then
        await expect(roomService.updateById(
          999, { name: "" },
        )).rejects.toThrow(NotFoundException);
        expect(getByKey.calledOnceWithExactly(
          "id", 999,
        )).toBeTruthy();

      },

    );

    it(
      "deleteById success", async () => {

        // Given
        const fakeRepo = stubInterface<IRepository<Room>>();

        // When
        fakeRepo.delete.resolves({
          affected: 1,
          raw     : undefined,
        });

        sandbox.replace(
          RoomService.prototype, "getRepository", () => fakeRepo,
        );

        const res = await new RoomService().deleteById(1);

        expect(fakeRepo.delete.calledOnceWithExactly({ id: 1 })).toBeTruthy();
        expect(res).toBeUndefined();

      },

    );

    it(
      "deleteById should throw when not found", async () => {

        // Given
        const fakeRepo = stubInterface<IRepository<Room>>();

        // When
        fakeRepo.delete.resolves({
          affected: 0,
          raw     : undefined,
        });

        sandbox.replace(
          RoomService.prototype, "getRepository", () => fakeRepo,
        );

        const roomService = new RoomService();

        await expect(roomService.deleteById(1)).rejects.toThrow(NotFoundException);
        expect(fakeRepo.delete.calledOnceWithExactly({ id: 1 })).toBeTruthy();

      },

    );

  },
);
