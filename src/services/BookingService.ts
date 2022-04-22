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
    startDate: string,
    endDate: string,
  ): Promise<Booking> {

    const repo = this.getRepository();
    const slotService = new SlotService();

    const slotRequested = await slotService.getByKey(
      "id", slotId,
    );

    let bookingVerificationQuery;

    if (slotRequested.isDisabled === false) {

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

  public async create(bookingData: BookingCreateBodyValidator): Promise<Booking> {

    console.log(bookingData);
    const repo = this.getRepository();
    const {
      slotId,
      startDate,
      endDate,
    } = bookingData;

    const isThereABookingInSlot = await this.isSlotAvalible(
      slotId,
      startDate,
      endDate,
    );


    let booking;

    if (isThereABookingInSlot === null) {

      booking = await repo.save({
        ...bookingData,
        slot: {
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
