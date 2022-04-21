import Booking from "../entities/Booking";
import { IMapper } from "./IMapper";

export interface BookingDto{
  id: number,
  createdAt: Date,
  updatedAt: Date,
  startDate: Date,
  endDate: Date,
}

class BookingMapper implements IMapper<Booking, BookingDto> {
  toDto(booking: Booking): BookingDto {
    return {
      createdAt: new Date(booking.createdAt),
      endDate  : new Date(booking.endDate),
      id       : booking.id,
      startDate: new Date(booking.startDate),
      updatedAt: new Date(booking.updatedAt),
    };

  }
}

export default BookingMapper;
