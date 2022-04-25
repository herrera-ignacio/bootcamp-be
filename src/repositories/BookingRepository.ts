import {
  Between,
  LessThanOrEqual,
  MoreThanOrEqual,
} from "typeorm";
import Database from "../providers/Database";
import Booking from "../entities/Booking";
import IBookingRepository from "../types/Booking/IBookingRepository";




const bookingRepository = (): IBookingRepository<Booking> => Database.getConnection()
  .getRepository(Booking).extend({
    findById(id: number): Promise<Booking> {
      return this.findOne({ where: { id } });
    },
    findByIdAndDates(
      slot: number, startDate: string, endDate: string,
    ): Promise<Booking[]> {
      return this.find({
        slot,
        where: [
          {
            endDate: Between(
              startDate, endDate,
            ),
          },
          {
            startDate: Between(
              startDate, endDate,
            ),
          },
          {
            endDate  : MoreThanOrEqual(endDate),
            startDate: LessThanOrEqual(startDate),
          },
        ],
      });
    },
  });


export default bookingRepository;
