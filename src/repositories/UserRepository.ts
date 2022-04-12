import { Repository } from "typeorm";
import Database from "../providers/Database";
import User from "../entities/User";

/**
 * Concrete repository for Users
 */
const userRepository = (): Repository <User> =>
  Database.getConnection().getRepository(User).extend({
    findByEmail(email: string): Promise<User> {
      return this.findOne({ where: { email } });
    },
    findById(id: number): Promise<User> {
      return this.findOne({ where: { id } });
    },
  });

export default userRepository;
