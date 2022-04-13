import { Repository } from "typeorm";
import Database from "../providers/Database";
import EscapePod from "../entities/EscapePod";

/**
 * Concrete repository for EscapePods
 */
const escapePodRepository = (): Repository <EscapePod> => Database.getConnection()
  .getRepository(EscapePod).extend({

    findById(id: number): Promise<EscapePod> {
      return this.findOne({ where: { id } });
    },
  });

export default escapePodRepository;
