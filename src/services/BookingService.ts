import { instanceToPlain } from "class-transformer";
import bookingRepository from "../repositories/BookingRepository";
import IRepository from "../types/IRepository";
import Booking from "../entities/Booking";
import BookingCreateBodyValidator from "../validators/Booking/BookingCreateBodyValidator";
import SlotService from "./SlotService";
import HttpException from "../exceptions/HttpException";
import NotFoundException from "../exceptions/NotFoundException";




class BookingService {

  public getRepository(): IRepository<Booking> {
    return bookingRepository();
  }

  private static notFoundErrorMessage = (
    key: string, value: string | number,
  ) => `Booking ${key}:${value} not found`;

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

    const bookingsAmount = instanceToPlain(isThereABookingInTheTimeFrame).length;


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

  public async deleteById(id: number): Promise<void> {
    const repo = this.getRepository();
    const affectedData = await repo.delete({ id });

    if (affectedData.affected === 0) {
      throw new NotFoundException(BookingService.notFoundErrorMessage(
        "id", id,
      ));
    }
  }
}

export default BookingService;
