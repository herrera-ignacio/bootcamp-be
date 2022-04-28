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
    findBySlotIdAndDates(
      slotId: number,
      startDate: string,
      endDate: string,
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
    findByUserIdAndDates(
      userId: number,
      startDate: string,
      endDate: string,
    ): Promise<Booking[]> {
      return this.find({
        relations: { user: true },
        where    : [
          {
            endDate: Between(
              startDate, endDate,
            ),
            user: {
              id: userId,
            },
          },
          {
            startDate: Between(
              startDate, endDate,
            ),
            user: {
              id: userId,
            },
          },
          {
            endDate  : MoreThanOrEqual(endDate),
            startDate: LessThanOrEqual(startDate),
            user     : {
              id: userId,
            },
          },
        ],
      });
    },
  });


export default bookingRepository;
