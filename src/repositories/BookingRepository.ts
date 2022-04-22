import { Brackets } from "typeorm";
import Database from "../providers/Database";
import Booking from "../entities/Booking";
import IRepository from "../types/IRepository";



const bookingRepository = (): IRepository<Booking> => Database.getConnection()
  .getRepository(Booking).extend({
    findById(id: number): Promise<Booking> {
      return this.findOne({ where: { id } });
    },
    findByIdAndDates(
      slotId: number, startDate: string, endDate: string,
    ): Promise<Booking> {
      return this.createQueryBuilder().select("booking")
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
    },
  });


export default bookingRepository;
