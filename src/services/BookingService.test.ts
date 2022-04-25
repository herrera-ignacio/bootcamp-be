import sinon from "sinon";
import { stubInterface } from "ts-sinon";
import IRepository from "../types/IRepository";
import Booking from "../entities/Booking";
import BookingService from "./BookingService";
import NotFoundException from "../exceptions/NotFoundException";

describe(
  "BookingService", () => {
    const sandbox = sinon.createSandbox();

    afterEach(() => sandbox.restore());

    it(
      "deleteById success", async () => {
        // Given
        const fakeRepo = stubInterface<IRepository<Booking>>();

        // When
        fakeRepo.delete.resolves({
          affected: 1,
          raw     : undefined,
        });

        sandbox.replace(
          BookingService.prototype, "getRepository", () => fakeRepo,
        );

        const res = await new BookingService().deleteById(1);

        // Then
        expect(fakeRepo.delete.calledOnceWithExactly({ id: 1 })).toBeTruthy();

        expect(res).toBeUndefined();
      },
    );

    it(
      "deleteById should throw when not found", async () => {
        // Given
        const fakeRepo = stubInterface<IRepository<Booking>>();

        // When
        fakeRepo.delete.resolves({
          affected: 0,
          raw     : undefined,
        });

        sandbox.replace(
          BookingService.prototype, "getRepository", () => fakeRepo,
        );

        const bookingService = new BookingService();

        // Then
        await expect(bookingService.deleteById(1)).rejects.toThrow(NotFoundException);

        expect(fakeRepo.delete.calledOnceWithExactly({ id: 1 })).toBeTruthy();
      },
    );
  },
);
