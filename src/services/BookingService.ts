import { Brackets } from "typeorm";
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

  public async isSlotAvalible(
    slotId: number,
    bookingData: BookingCreateBodyValidator,
  ): Promise<Booking> {

    const repo = this.getRepository();
    const slotService = new SlotService();

    const slotRequested = await slotService.getByKey(
      "id", slotId,
    );

    let bookingVerificationQuery;

    if (slotRequested.isDisabled === false) {
      const {
        startDate, endDate,
      } = bookingData;

      bookingVerificationQuery = await repo.createQueryBuilder().select("booking")
        .from(
          Booking,
          "booking",
        )
        .where(
          "booking.slotId = :slotId", { slotId },
        )
        .andWhere(new Brackets((qb) => {
          qb.where(
            "booking.startDate >= :startDate", { startDate },
          )
            .orWhere(
              "booking.endDate >= :endDate", { endDate },
            );
        }))
        .getOne();

      console.log(bookingVerificationQuery);
    }
    return bookingVerificationQuery;
  }

  public async create(
    slotId: number, bookingData: BookingCreateBodyValidator,
  ): Promise<Booking> {


    const repo = this.getRepository();
    const slotService = new SlotService();

    const isThereABookingInSlot = await this.isSlotAvalible(
      slotId, bookingData,
    );


    let booking;

    if (isThereABookingInSlot === null) {

      const slotRequested = await slotService.getByKey(
        "id", slotId,
      );

      booking = await repo.save({
        ...bookingData,
        slot: {
          ...slotRequested,
          id: slotId,
        },
      });

    } else {

      throw new HttpException();
    }

    return booking;
  }

}

export default BookingService;
