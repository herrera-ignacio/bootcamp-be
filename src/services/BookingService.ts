import { In } from "typeorm";
import bookingRepository from "../repositories/BookingRepository";
import IBookingRepository from "../types/Booking/IBookingRepository";
import Booking from "../entities/Booking";
import BookingCreateBodyValidator from "../validators/Booking/BookingCreateBodyValidator";
import SlotService from "./SlotService";
import HttpException from "../exceptions/HttpException";
import NotFoundException from "../exceptions/NotFoundException";
import { IService } from "../types/IService";

class BookingService implements IService<Booking> {

  public getRepository(): IBookingRepository {
    return bookingRepository();
  }

  public async getById(
    id: number, withUser = false,
  ): Promise<Booking> {
    return this.getRepository().findById(
      id, withUser,
    );
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

    await repo.delete({ slot: { id: slotId } });

  }

  public async deleteBookingsBySeveralSlotIds(slotIds: number[]): Promise<void> {
    const repo = this.getRepository();

    await repo.delete({ slot: { id: In(slotIds) } } );

  }

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

  private static notFoundErrorMessage = (
    key: string, value: string | number,
  ) => `Booking ${key}:${value} not found`;

}

export default BookingService;
