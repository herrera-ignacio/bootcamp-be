import sinon from "sinon";
import { stubInterface } from "ts-sinon";
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
        };

        const isThereABookingInTheTimeFrame = sinon.fake.resolves(false);

        // When
        fakeRepo.save.resolves(bookingMock);
        sandbox.replace(
          BookingService.prototype, "isThereABookingInThisTimeFrame", isThereABookingInTheTimeFrame,
        );

        sandbox.replace(
          BookingService.prototype, "getRepository", () => fakeRepo,
        );

        // Then
        const res = await new BookingService().create(userInput);

        expect(fakeRepo.save.calledOnceWithExactly({
          ...userInput,
          slot: { id: 5 },
        } )).toBeTruthy();
        expect(res).toEqual(bookingMock);
      },
    );

    it(
      "create fails due to missing params", async () => {

        const fakeRepo = stubInterface<IBookingRepository>();
        const isThereABookingInTheTimeFrame = sinon.fake.resolves(false);

        fakeRepo.save.throws(new HttpException());

        sandbox.replace(
          BookingService.prototype, "isThereABookingInThisTimeFrame", isThereABookingInTheTimeFrame,
        );

        sandbox.replace(
          BookingService.prototype, "getRepository", () => fakeRepo,
        );

        await expect(new BookingService().create({
          endDate  : undefined,
          slotId   : undefined,
          startDate: undefined,
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
        })).rejects.toThrow(HttpException);


      },
    );



  },
);
