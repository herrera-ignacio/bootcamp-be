import {
  Between,
  LessThanOrEqual,
  MoreThanOrEqual,
} from "typeorm";
import Database from "../providers/Database";
import Booking from "../entities/Booking";
import IBookingRepository from "../types/Booking/IBookingRepository";




const bookingRepository = (): IBookingRepository => Database.getConnection()
  .getRepository(Booking).extend({
    findById(id: number): Promise<Booking> {
      return this.findOne({ where: { id } });
    },
    findByIdAndDates(
      slotId: number, startDate: string, endDate: string,
    ): Promise<Booking[]> {
      return this.find({
        relations: { slot: true },
        where    : [
          {
            endDate: Between(
              startDate, endDate,
            ),
            slot: {
              id: slotId,
            },
          },
          {
            slot: {
              id: slotId,
            },
            startDate: Between(
              startDate, endDate,
            ),
          },
          {
            endDate: MoreThanOrEqual(endDate),
            slot   : {
              id: slotId,
            },
            startDate: LessThanOrEqual(startDate),
          },
        ],
      });
    },
  });


export default bookingRepository;
