import Booking from "../entities/Booking";

const getBookingMock = () => Booking.build({
  createdAt: new Date().toDateString(),
  endDate  : new Date().toDateString(),
  id       : 1,
  startDate: new Date().toDateString(),
  updatedAt: new Date().toDateString(),

});

export default getBookingMock;
