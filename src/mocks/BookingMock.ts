import Booking from "../entities/Booking";

const getBookingMock = () => Booking.build({
  createdAt: new Date().toDateString(),
  endDate  : new Date("2023-04-27").toDateString(),
  id       : 1,
  startDate: new Date("2023-04-25").toDateString(),
  updatedAt: new Date().toDateString(),

});

export default getBookingMock;
