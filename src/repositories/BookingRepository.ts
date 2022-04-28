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
      {
        entity,
        entityId,
      },
      startDate: string,
      endDate: string,
    ): Promise<Booking[]> {
      return this.find({
        relations: { [entity]: true },
        where    : [
          {
            endDate: Between(
              startDate, endDate,
            ),
            [entity]: {
              id: entityId,
            },
          },
          {
            [entity]: {
              id: entityId,
            },
            startDate: Between(
              startDate, endDate,
            ),
          },
          {
            endDate : MoreThanOrEqual(endDate),
            [entity]: {
              id: entityId,
            },
            startDate: LessThanOrEqual(startDate),
          },
        ],
      });
    },
  });


export default bookingRepository;
