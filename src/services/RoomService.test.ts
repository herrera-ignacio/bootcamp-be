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

    it(
      "create fails due to missing params", async () => {

        const fakeRepo = stubInterface<IRepository<Room>>();

        fakeRepo.save.throws();
        sandbox.replace(
          RoomService.prototype, "getRepository", () => fakeRepo,
        );

        await expect(new RoomService().create({
          name: undefined,
        }))
          .rejects.
          toThrow();

        expect(fakeRepo.save.calledOnce).toBeTruthy();

      },
    );
  },
);
