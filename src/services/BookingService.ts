import bookingRepository from "../repositories/BookingRepository";
import IRepository from "../types/IRepository";
import Booking from "../entities/Booking";
import BookingCreateBodyValidator from "../validators/Booking/BookingCreateBodyValidator";
import SlotService from "./SlotService";
import HttpException from "../exceptions/HttpException";



class BookingService {

  public getRepository(): IRepository<Booking> {
    return bookingRepository();
  }

  public async isThereABookingInThisTimeFrame(
    slotId: number,
    startDate: string,
    endDate: string,
  ): Promise<boolean> {

    const repo = this.getRepository();

    const slotService = new SlotService();

    const slotRequested = await slotService.getByKey(
      "id", slotId,
    );

    if (slotRequested.isDisabled === true) {
      throw new HttpException();
    }

    const isThereABookingInTheTimeFrame = await repo.findByIdAndDates(
      slotId,
      startDate,
      endDate,
    );


    const bookingsAmount = Object.keys({ ...isThereABookingInTheTimeFrame }).length;


    if (bookingsAmount !== 0) {
      console.log(`Yes, there's already a booking in that timeframe ${true}`);
      throw new HttpException();
    }


    return false;
  }




  public async create(bookingData: BookingCreateBodyValidator): Promise<Booking> {

    const repo = this.getRepository();
    const {
      slotId,
      startDate,
      endDate,
    } = bookingData;

    await this.isThereABookingInThisTimeFrame(
      slotId,
      startDate,
      endDate,
    );

    const booking = await repo.save({
      ...bookingData,
      slot: {
        id: slotId,
      },
    });

    return booking;
  }

}

export default BookingService;
