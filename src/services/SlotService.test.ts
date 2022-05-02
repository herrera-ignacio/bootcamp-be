import sinon from "sinon";
import { stubInterface } from "ts-sinon";
import Slot from "../entities/Slot";
import IRepository from "../types/IRepository";
import getSlotMock from "../mocks/SlotMock";
import SlotService from "./SlotService";
import NotFoundException from "../exceptions/NotFoundException";
import BookingService from "./BookingService";
import IBookingRepository from "../types/Booking/IBookingRepository";

describe(
  "SlotService", () => {
    const sandbox = sinon.createSandbox();

    afterEach(() => sandbox.restore());

    it(
      "getAllSlotsByRoomId should return an array with all the slots linked to a room",

      async () => {

        const slotMock = [ getSlotMock(), getSlotMock(), getSlotMock() ];
        const fakeRepo = stubInterface<IRepository<Slot>>();

        fakeRepo.find.resolves(slotMock);
        sandbox.replace(
          SlotService.prototype, "getRepository", () => fakeRepo,
        );

        const res = await new SlotService().getAllSlotsByRoomId(25);

        expect(res).toEqual(slotMock);
        expect(fakeRepo.find.called).toBeTruthy();


      },
    );

    it(
      "create should generate a new slot when called and return its data", async () => {
        // Given
        const slotMock = getSlotMock();
        const fakeRepo = stubInterface<IRepository<Slot>>();
        const userInput = {
          roomId: 17,
        };

        // When
        fakeRepo.save.resolves(slotMock);
        sandbox.replace(
          SlotService.prototype, "getRepository", () => fakeRepo,
        );

        // Then
        const res = await new SlotService().create(userInput);

        expect(res).toEqual(slotMock);
        expect(fakeRepo.save.calledWithExactly({
          ...userInput,
          room: { id: userInput.roomId },
        })).toBeTruthy();
      },
    );

    it(
      "create fails due to missing parameters", async () => {
        // Given
        const fakeRepo = stubInterface<IRepository<Slot>>();

        // When
        fakeRepo.save.throws();
        sandbox.replace(
          SlotService.prototype, "getRepository", () => fakeRepo,
        );

        // Then
        await expect(new SlotService().create({
          isDisabled: undefined,
          roomId    : undefined,
        }))
          .rejects.toThrow();

        expect(fakeRepo.save.calledOnce).toBeTruthy();
      },
    );

    it(
      "updateById success", async () => {
        // Given
        const slotMock = getSlotMock();
        // const bookingMock = getBookingMock();
        const expectedSlot = {
          ...slotMock,
          isDisabled: true,
        };

        const fakeBookingRepo = stubInterface<IBookingRepository>();

        const fakeRepo = stubInterface<IRepository<Slot>>();
        const getByKey = sinon.fake.resolves(slotMock);

        // When
        fakeRepo.save.resolvesArg(0);
        fakeBookingRepo.delete.resolves({
          affected: 1,
          raw     : undefined,
        });

        sandbox.replace(
          SlotService.prototype, "getByKey", getByKey,
        );

        sandbox.replace(
          BookingService.prototype, "getRepository", () => fakeBookingRepo,
        );

        sandbox.replace(
          SlotService.prototype, "getRepository", () => fakeRepo,
        );


        const res = await new SlotService().updateById(
          slotMock.id, { isDisabled: expectedSlot.isDisabled },
        );

        // Then
        expect(getByKey.calledOnceWithExactly(
          "id", slotMock.id,
        )).toBeTruthy();
        expect(fakeRepo.save.calledOnceWithExactly({
          ...slotMock,
          isDisabled: expectedSlot.isDisabled,
        })).toBeTruthy();
        expect(res).toEqual(expectedSlot);
      },

    );

    it(
      "updateById not found slot", async () => {
        // Given
        const getByKey = sinon.fake.throws(new NotFoundException());
        const fakeRepo = stubInterface<IRepository<Slot>>();


        // When
        sandbox.replace(
          SlotService.prototype, "getRepository", () => fakeRepo,
        );
        sandbox.replace(
          SlotService.prototype, "getByKey", getByKey,
        );
        const slotService = new SlotService();

        // Then
        await expect(slotService.updateById(
          999, { isDisabled: true },
        )).rejects.toThrow(NotFoundException);
        expect(getByKey.calledOnceWithExactly(
          "id", 999,
        )).toBeTruthy();
      },
    );

    it(
      "deleteById success", async () => {
        // Given
        const fakeRepo = stubInterface<IRepository<Slot>>();

        // When
        fakeRepo.delete.resolves({
          affected: 1,
          raw     : undefined,
        });

        sandbox.replace(
          SlotService.prototype, "getRepository", () => fakeRepo,
        );

        // Then
        const res = await new SlotService().deleteById(1);

        expect(fakeRepo.delete.calledOnceWithExactly({
          id: 1,
        })).toBeTruthy();

        expect(res).toBeUndefined();
      },
    );

    it(
      "deleteById should throw when not found", async () => {
        // Given
        const fakeRepo = stubInterface<IRepository<Slot>>();

        // When
        fakeRepo.delete.resolves({
          affected: 0,
          raw     : undefined,
        });

        sandbox.replace(
          SlotService.prototype, "getRepository", () => fakeRepo,
        );

        const slotService = new SlotService();

        // Then
        await expect(slotService.deleteById(1)).rejects.toThrow();

        expect(fakeRepo.delete.calledOnceWithExactly({ id: 1 })).toBeTruthy();
      },
    );
  },
);
