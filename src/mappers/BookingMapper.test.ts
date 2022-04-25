import getBookingMock from "../mocks/BookingMock";
import BookingMapper from "./BookingMapper";

describe(
  "Booking Mapper", () => {

    it(
      "Booking to Dto", () => {
        const booking = getBookingMock();
        const bookingDto = new BookingMapper().toDto(booking);

        expect(bookingDto).toEqual({
          createdAt: new Date(booking.createdAt),
          endDate  : new Date(booking.endDate),
          id       : booking.id,
          startDate: new Date(booking.startDate),
          updatedAt: new Date(booking.updatedAt),
        });
      },
    );
  },
);
