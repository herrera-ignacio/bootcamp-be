import { Repository } from "typeorm";
import Database from "../providers/Database";
import EscapePod from "../entities/EscapePod";

/**
 * Concrete repository for EscapePods
 */
const userRepository = (): Repository <EscapePod> => Database.getConnection()
  .getRepository(EscapePod).extend({
    findByEmail(email: string): Promise<EscapePod> {
      return this.findOne({ where: { email } });
    },

    findById(id: number): Promise<EscapePod> {
      return this.findOne({ where: { id } });
    },
  });

export default userRepository;
