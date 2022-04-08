import {
  IsEmail, IsEnum, IsOptional, IsString,
} from "class-validator";
import { UserRole } from "../../entities/User";
  
/**
   * Base validator for User
   */
export default class UserValidator {
  @IsEmail()
  public email: string;
  
  @IsString()
  @IsOptional()
  public firstName?: string;
  
  @IsString()
  @IsOptional()
  public lastName?: string;

  @IsString()
  @IsOptional()
  public auth0_id?: string;
  
  @IsEnum(UserRole)
  @IsOptional()
  public role: UserRole;
}
  