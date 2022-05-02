import { In } from "typeorm";
import sinon from "sinon";
import { stubInterface } from "ts-sinon";
import NotFoundException from "../exceptions/NotFoundException";
import HttpException from "../exceptions/HttpException";
import getBookingMock from "../mocks/BookingMock";
import IBookingRepository from "../types/Booking/IBookingRepository";
import BookingService from "./BookingService";


describe(
  "BookingService", () => {

    const sandbox = sinon.createSandbox();

    afterEach(() => sandbox.restore());

    it(
      "create success", async () => {

        // Given
        const bookingMock = getBookingMock();
        const fakeRepo = stubInterface<IBookingRepository>();
        const userInput = {
          endDate  : bookingMock.endDate,
          slotId   : 5,
          startDate: bookingMock.endDate,
          userId   : 1,
        };

        const isThereABookingInTheTimeFrame = sinon.fake.resolves(false);
        const hasTheUserAlreadyBooked = sinon.fake.resolves(false);

        // When
        fakeRepo.save.resolves(bookingMock);
        sandbox.replace(
          BookingService.prototype, "isThereABookingInThisTimeFrame", isThereABookingInTheTimeFrame,
        );

        sandbox.replace(
          BookingService.prototype,
          "hasTheUserAlreadyBooked",
          hasTheUserAlreadyBooked,
        );

        sandbox.replace(
          BookingService.prototype, "getRepository", () => fakeRepo,
        );

        // Then
        const res = await new BookingService().create(userInput);

        expect(fakeRepo.save.calledOnceWithExactly({
          ...userInput,
          slot: { id: 5 },
          user: { id: 1 },
        } )).toBeTruthy();
        expect(res).toEqual(bookingMock);
      },
    );

    it(
      "create fails due to missing params", async () => {

        const fakeRepo = stubInterface<IBookingRepository>();
        const isThereABookingInTheTimeFrame = sinon.fake.resolves(false);
        const hasTheUserAlreadyBooked = sinon.fake.resolves(false);

        fakeRepo.save.throws(new HttpException());

        sandbox.replace(
          BookingService.prototype, "isThereABookingInThisTimeFrame", isThereABookingInTheTimeFrame,
        );

        sandbox.replace(
          BookingService.prototype,
          "hasTheUserAlreadyBooked",
          hasTheUserAlreadyBooked,
        );

        sandbox.replace(
          BookingService.prototype, "getRepository", () => fakeRepo,
        );

        await expect(new BookingService().create({
          endDate  : undefined,
          slotId   : undefined,
          startDate: undefined,
          userId   : undefined,
        }))
          .rejects.
          toThrow(HttpException);

        expect(fakeRepo.save.calledOnce).toBeTruthy();

      },
    );

    it(
      "create fails due to startDate is after endDate", async () => {

        const bookingMock = getBookingMock();
        const fakeRepo = stubInterface<IBookingRepository>();

        sandbox.replace(
          BookingService.prototype, "getRepository", () => fakeRepo,
        );

        await expect(new BookingService().create({
          endDate  : bookingMock.startDate,
          slotId   : 5,
          startDate: bookingMock.endDate,
          userId   : 1,
        })).rejects.toThrow(HttpException);


      },
    );

    it(
      "create fails due to startDate is a past date", async () => {

        const bookingMock = getBookingMock();
        const fakeRepo = stubInterface<IBookingRepository>();

        sandbox.replace(
          BookingService.prototype, "getRepository", () => fakeRepo,
        );

        await expect(new BookingService().create({
          endDate  : bookingMock.endDate,
          slotId   : 5,
          startDate: new Date("2021-04-25").toDateString(),
          userId   : 1,
        })).rejects.toThrow(HttpException);


      },
    );

    it(
      "create fails due to the user having another booking in the same time frame", async () => {
        // Given
        const bookingMock = getBookingMock();
        const fakeRepo = stubInterface<IBookingRepository>();
        const userInput = {
          endDate  : bookingMock.endDate,
          slotId   : 5,
          startDate: bookingMock.endDate,
          userId   : 1,
        };

        const isThereABookingInTheTimeFrame = sinon.fake.resolves(false);

        // When
        fakeRepo.findByUserIdAndDates.resolves([ bookingMock ]);
        sandbox.replace(
          BookingService.prototype, "getRepository", () => fakeRepo,
        );

        sandbox.replace(
          BookingService.prototype, "isThereABookingInThisTimeFrame", isThereABookingInTheTimeFrame,
        );

        // Then
        await expect(new BookingService().create(userInput)).rejects.toThrow(HttpException);
      },
    );

    it(
      "deleteById success", async () => {
        // Given
        const fakeRepo = stubInterface<IBookingRepository>();

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
        const fakeRepo = stubInterface<IBookingRepository>();

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

    it(
      "deleteBookingsBySeveralSlotsIds success", async () => {
        // Given
        const fakeRepo = stubInterface<IBookingRepository>();

        // When
        fakeRepo.delete.resolves({
          affected: 1,
          raw     : undefined,
        });

        sandbox.replace(
          BookingService.prototype, "getRepository", () => fakeRepo,
        );

        const res = await new BookingService().deleteBookingsBySeveralSlotIds([ 1, 2, 3 ]);

        // Then
        expect(fakeRepo.delete.calledOnceWithExactly({
          slot: {
            id: In([ 1, 2, 3 ] ),
          },
        })).toBeTruthy();

        expect(res).toBeUndefined();
      },
    );

  },
);
