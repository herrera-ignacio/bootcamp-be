/* eslint-disable class-methods-use-this */
import User, { UserRole } from "../entities/User";
import { IMapper } from "./IMapper";

export interface UserDto {
  id: number;
  email: string;
  firstName:string,
  lastName:string;
  createdAt:Date;
  updatedAt:Date;
  role:UserRole;
}

/**
 * User Mapper for serializing.
 */
export class UserMapper implements IMapper<User, UserDto> {
  toDto(u: User): UserDto {
    return {
      id: u.id,
      email: u.email,
      firstName: u.firstName,
      lastName: u.lastName,
      createdAt: new Date(u.createdAt),
      updatedAt: new Date(u.updatedAt),
      role: u.role,
    };
  }
}
