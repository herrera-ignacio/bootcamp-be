// import { Brackets } from "typeorm";
import { Between } from "typeorm";
import Database from "../providers/Database";
import Booking from "../entities/Booking";
import IRepository from "../types/IRepository";




const bookingRepository = (): IRepository<Booking> => Database.getConnection()
  .getRepository(Booking).extend({
    findById(id: number): Promise<Booking> {
      return this.findOne({ where: { id } });
    },
    findByIdAndDates(
      slot: number, startDate: string, endDate: string,
    ): Promise<Booking> {
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
        ],
      });
    },
  });


export default bookingRepository;
