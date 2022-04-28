import bookingRepository from "../repositories/BookingRepository";
import IBookingRepository from "../types/Booking/IBookingRepository";
import Booking from "../entities/Booking";
import BookingCreateBodyValidator from "../validators/Booking/BookingCreateBodyValidator";
import SlotService from "./SlotService";
import HttpException from "../exceptions/HttpException";
import NotFoundException from "../exceptions/NotFoundException";




class BookingService {

  public getRepository(): IBookingRepository {
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


    const slotService = new SlotService();

    const slotRequested = await slotService.getByKey(
      "id", slotId,
    );

    if (slotRequested.isDisabled === true) {
      throw new HttpException();
    }
    const repo = this.getRepository();
    const isThereABookingInTheTimeFrame = await repo.findByIdAndDates(
      slotId,
      startDate,
      endDate,
    );

    const bookingsAmount = isThereABookingInTheTimeFrame.length;


    if (bookingsAmount !== 0) {
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

    if (endDate < startDate || new Date(startDate) < new Date()) {
      throw new HttpException(
        400,
        "Bad Request: endDate should be after startDate and startDate should be after current date",
      );
    }

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

  public async deleteBookingsBySlotId(slotId: number): Promise<void> {
    const repo = this.getRepository();
    const affectedData = await repo.delete({ slot: { id: slotId } });

    if (affectedData.affected === 0) {
      throw new NotFoundException(BookingService.notFoundErrorMessage(
        "slotId", slotId,
      ));
    }
  }
}

export default BookingService;
