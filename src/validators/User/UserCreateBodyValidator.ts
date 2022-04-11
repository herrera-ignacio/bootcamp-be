import {
  IsEmail,
  IsEnum,
  IsOptional,
  IsString,
} from "class-validator";
import { UserRole } from "../../entities/User";
import { UserCreateBody } from "../../types/User/UserCreateRequest";

/**
   * Validate user's create request body
   */
export default class UserCreateBodyValidator implements UserCreateBody {
  [x: string]: string;

  @IsEmail()
  public email: string;

  @IsString()
  @IsOptional()
  public firstName?: string;

  @IsString()
  @IsOptional()
  public lastName?: string;

  @IsEnum(UserRole)
  public role: UserRole;
}
