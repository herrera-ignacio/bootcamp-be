import sinon from "sinon";
import { stubInterface } from "ts-sinon";
import Slot from "../entities/Slot";
import IRepository from "../types/IRepository";
import getSlotMock from "../mocks/SlotMock";
import SlotService from "./SlotService";

describe(
  "SlotService", () => {
    const sandbox = sinon.createSandbox();

    afterEach(() => sandbox.restore());

    it(
      "create should generate a new slot when called and return its data", async () => {
        // Given
        const slotMock = getSlotMock();
        const fakeRepo = stubInterface<IRepository<Slot>>();
        const userInput = {
          isDisabled: true,
        };

        // When
        fakeRepo.save.resolves(slotMock);
        sandbox.replace(
          SlotService.prototype, "getRepository", () => fakeRepo,
        );

        // Then
        const res = await new SlotService().create(userInput);

        expect(res).toEqual(slotMock);
        expect(fakeRepo.save.calledWithExactly(userInput)).toBeTruthy();
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
        }))
          .rejects.toThrow();

        expect(fakeRepo.save.calledOnce).toBeTruthy();
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
