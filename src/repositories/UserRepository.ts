import { Repository } from "typeorm";
import Database from "../providers/Database";
import User from "../entities/User";

/**
 * Concrete repository for Users
 */
const UserRepository = (): Repository <User> => Database.getConnection().getRepository(User).extend({
  findById(id: number): Promise<User> {
    return this.findOne({ where: { id } });
  },

  findByEmail(email: string): Promise<User> {
    return this.findOne({ where: { email } });
  },

  getByAuth0_id(auth0_id: string): Promise<User> {
    return this.findOne({ where: { auth0_id } });
  },
});

export default UserRepository;