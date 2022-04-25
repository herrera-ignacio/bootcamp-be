/* eslint-disable @typescript-eslint/no-explicit-any */
// noinspection JSVoidFunctionReturnValueUsed
import sinon from "sinon";
import BookingController from "./BookingController";
import getBookingMock from "../mocks/BookingMock";
import getRequestMock from "../mocks/RequestMock";
import getResponseMock from "../mocks/ResponseMock";
import BookingService from "../services/BookingService";
import BookingMapper from "../mappers/BookingMapper";
import {
  BookingCreateBody,
  BookingCreateRequest,
} from "../types/Booking/BookingCreateRequest";

describe(

  "BookingController", () => {
    const sandbox = sinon.createSandbox();

    afterEach(() => sandbox.restore());

    it(
      "create should return 201 and escapePod created on success", async () => {

        // Given
        const bookingMock = getBookingMock();
        const fakeService = sinon.createStubInstance(BookingService);
        const bookingCreateBody: BookingCreateBody = {
          createdAt: bookingMock.createdAt,
          endDate  : bookingMock.endDate,
          id       : bookingMock.id,
          slotId   : 2,
          startDate: bookingMock.startDate,
          updatedAt: bookingMock.updatedAt,
        };
        const fakeReq: BookingCreateRequest = getRequestMock({
          body: bookingCreateBody,
        });
        const fakeRes = getResponseMock();
        const controller = new BookingController(fakeService);

        // When
        fakeService.create.resolves(bookingMock);

        await controller.create(
          fakeReq, fakeRes as any, null,
        );

        // Then
        expect(fakeService.create.calledOnceWithExactly(bookingCreateBody)).toBeTruthy();
        expect(fakeRes.json.calledOnceWithExactly({
          data: new BookingMapper().toDto(bookingMock),
        })).toBeTruthy();
        expect(fakeRes.status.calledOnceWithExactly(201)).toBeTruthy();

      },

    );

    it(
      "create should bubble up an exception", async () => {
        // Given

        const fakeService = sinon.createStubInstance(BookingService);
        const fakeReq = getRequestMock({});
        const fakeRes = getResponseMock();
        const controller = new BookingController(fakeService);

        // When
        fakeService.create.throws();

        // Then
        await expect(controller.create(
          fakeReq, fakeRes as any, null,
        )).rejects.toThrow();
        expect(fakeService.create.calledOnce).toBeTruthy();
      },

    );
  },

);
