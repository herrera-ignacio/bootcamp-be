import {
  IsEmail,
  IsEnum,
  IsOptional,
  IsString,
} from "class-validator";
import { UserRole } from "../../entities/User";
import { UserUpdateBody } from "../../types/User/UserUpdateRequest";

/**
   * Validate user's update request body
   */
export default class UserUpdateBodyValidator implements UserUpdateBody {
  [x: string]: string;

  @IsEmail()
  @IsOptional()
  public email?: string;

  @IsString()
  @IsOptional()
  public firstName?: string;

  @IsString()
  @IsOptional()
  public lastName?: string;

  @IsString()
  @IsOptional()
  public avatarUrl?: string;

  @IsEnum(UserRole)
  @IsOptional()
  public role?: UserRole;
}
