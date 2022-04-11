/* eslint-disable class-methods-use-this */
import User, { UserRole } from "../entities/User";
import { IMapper } from "./IMapper";

export interface UserDto {
  id: number;
  email: string;
  firstName: string,
  lastName: string;
  createdAt: Date;
  updatedAt: Date;
  role: UserRole;
}

/**
 * User Mapper for serializing.
 */
export class UserMapper implements IMapper<User, UserDto> {
  toDto(u: User): UserDto {
    return {
      createdAt: new Date(u.createdAt),
      email    : u.email,
      firstName: u.firstName,
      id       : u.id,
      lastName : u.lastName,
      role     : u.role,
      updatedAt: new Date(u.updatedAt),
    };
  }
}
