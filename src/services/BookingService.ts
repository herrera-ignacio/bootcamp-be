import bookingRepository from "../repositories/BookingRepository";
import IBookingRepository from "../types/Booking/IBookingRepository";
import Booking from "../entities/Booking";
import BookingCreateBodyValidator from "../validators/Booking/BookingCreateBodyValidator";
import SlotService from "./SlotService";
import HttpException from "../exceptions/HttpException";
import NotFoundException from "../exceptions/NotFoundException";
import { UserRole } from "../entities/User";
import NotAuthorizedException from "../exceptions/NotAuthorizedException";




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
      throw new HttpException(
        400, "Slot is disabled.",
      );
    }

    const repo = this.getRepository();
    const foundBookings = await repo.findBySlotIdAndDates(
      slotId, startDate, endDate,
    );

    const isAlreadyBooked = foundBookings.length !== 0;

    if (isAlreadyBooked) {
      throw new HttpException(
        400, "Slot is already occupied.",
      );
    }

    return false;
  }

  public async hasTheUserAlreadyBooked(
    userId: number,
    startDate: string,
    endDate: string,
  ): Promise<boolean> {
    const repo = this.getRepository();

    const userBookings = await repo.findByUserIdAndDates(
      userId, startDate, endDate,
    );

    const hasTheUserAlreadyBooked = userBookings.length !== 0;

    if (hasTheUserAlreadyBooked) {
      throw new HttpException(
        400, "User already has a booking slot in this time frame",
      );
    }

    return false;
  }


  public async create(bookingData: BookingCreateBodyValidator): Promise<Booking> {

    const repo = this.getRepository();
    const {
      slotId,
      startDate,
      endDate,
      userId,
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

    await this.hasTheUserAlreadyBooked(
      userId,
      startDate,
      endDate,
    );

    const booking = await repo.save({
      ...bookingData,
      slot: {
        id: slotId,
      },
      user: {
        id: userId,
      },
    });

    return booking;
  }

  public async bookingBelongsToTheUser(
    bookingId: number, userId: number,
  ): Promise<boolean> {
    const repo = this.getRepository();
    const booking = await repo.findOneBy({ id: bookingId });

    console.log("Booking:");
    console.log(booking);

    if (Number(booking.user) === userId) {
      return true;
    }

    return false;
  }

  public async deleteById(
    bookingId: number, userId: number, userRole: string,
  ): Promise<void> {
    const isBookingBelongToTheUser = await this.bookingBelongsToTheUser(
      bookingId, userId,
    );

    console.log("isBookingBelongToTheUser:");
    console.log(isBookingBelongToTheUser);

    const isAllowedUser = userRole === UserRole.ADMIN
    || userRole === UserRole.CONTRACTOR && isBookingBelongToTheUser;

    console.log("isAllowedUser");
    console.log(isAllowedUser);

    if (!isAllowedUser) {
      throw new NotAuthorizedException();
    }

    const repo = this.getRepository();
    const affectedData = await repo.delete({ id: bookingId });

    if (affectedData.affected === 0) {
      throw new NotFoundException(BookingService.notFoundErrorMessage(
        "id", bookingId,
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
