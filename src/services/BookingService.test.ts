import sinon from "sinon";
import { stubInterface } from "ts-sinon";
import NotFoundException from "../exceptions/NotFoundException";
import HttpException from "../exceptions/HttpException";
import getBookingMock from "../mocks/BookingMock";
import IBookingRepository from "../types/Booking/IBookingRepository";
import BookingService from "./BookingService";
import NotAuthorizedException from "../exceptions/NotAuthorizedException";

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

        fakeRepo.findOneBy.resolves(getBookingMock());

        const bookingBelongsToTheUser = sinon.fake.resolves(true);

        sandbox.replace(
          BookingService.prototype, "bookingBelongsToTheUser", bookingBelongsToTheUser,
        );

        sandbox.replace(
          BookingService.prototype, "getRepository", () => fakeRepo,
        );

        const res = await new BookingService().deleteById(
          1, 1, "CONTRACTOR",
        );

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

        const bookingBelongsToTheUser = sinon.fake.resolves(true);

        sandbox.replace(
          BookingService.prototype, "bookingBelongsToTheUser", bookingBelongsToTheUser,
        );

        sandbox.replace(
          BookingService.prototype, "getRepository", () => fakeRepo,
        );

        const bookingService = new BookingService();

        // Then
        await expect(bookingService.deleteById(
          1, 1, "CONTRACTOR",
        )).rejects.toThrow(NotFoundException);

        expect(fakeRepo.delete.calledOnceWithExactly({ id: 1 })).toBeTruthy();
      },
    );

    it(
      "deleteById should fail when the booking doesn't belong to the contractor", async () => {
        // Given
        const bookingService = new BookingService();
        const fakeRepo = stubInterface<IBookingRepository>();

        // When
        sandbox.replace(
          BookingService.prototype, "getRepository", () => fakeRepo,
        );

        fakeRepo.findOneBy.resolves(getBookingMock());

        // Then
        await expect(bookingService.deleteById(
          5, 5, "CONTRACTOR",
        )).rejects.toThrow(NotAuthorizedException);
      },
    );
  },
);
