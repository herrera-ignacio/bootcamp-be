import { Repository } from "typeorm";
import Database from "../providers/Database";
import Booking from "../entities/Booking";

const bookingRepository = (): Repository<Booking> => Database.getConnection()
  .getRepository(Booking).extend({
    findById(id: number): Promise<Booking> {
      return this.findOne({ where: { id } });
    },
  });

export default bookingRepository;
