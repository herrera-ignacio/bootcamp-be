import bookingRepository from "../repositories/BookingRepository";
import IRepository from "../types/IRepository";
import Booking from "../entities/Booking";
import BookingCreateBodyValidator from "../validators/Booking/BookingCreateBodyValidator";

class BookingService {

  public getRepository(): IRepository<Booking> {
    return bookingRepository();
  }

  public async create(bookingData: BookingCreateBodyValidator): Promise<Booking> {
    const repo = this.getRepository();
    const booking = await repo.save(bookingData);

    return booking;
  }

}

export default BookingService;
