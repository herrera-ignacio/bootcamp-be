import User from "../entities/User";
import { IMapper } from "./IMapper";

export interface UserDto {
  id: number;
  email: string;
}

/**
 * User Mapper for serializing.
 */
export class UserMapper implements IMapper<User, UserDto> {
  toDto(u: User): UserDto {
    return {
      id: u.id,
      email: u.email,
    };
  }
}
