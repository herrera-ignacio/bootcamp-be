import Booking from "../entities/Booking";
import getSlotMock from "./SlotMock";
import getUserMock from "./UserMock";

const getBookingMock = () => Booking.build({
  createdAt: new Date().toDateString(),
  endDate  : new Date("2023-04-27").toDateString(),
  id       : 1,
  slot     : getSlotMock(),
  startDate: new Date("2023-04-25").toDateString(),
  updatedAt: new Date().toDateString(),
  user     : getUserMock(),
});

export default getBookingMock;
