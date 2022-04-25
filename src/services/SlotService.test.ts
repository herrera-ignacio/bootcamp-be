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
  },
);
