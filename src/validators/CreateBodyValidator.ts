import { 
  IsString, IsNotEmpty, IsEnum, 
} from "class-validator";
import { UserRole } from "../entities/User";


/**
 * Validate the query body to create an user
 */
export default class CreateBodyValidator {

  @IsNotEmpty()
  @IsString()
  public email: string;

  @IsEnum(UserRole)
  public role: UserRole;
}