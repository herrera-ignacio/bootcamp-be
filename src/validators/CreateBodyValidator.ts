import { 
  IsString, IsNotEmpty,
} from "class-validator";


/**
 * Validate the query body to create an user
 */
export default class CreateBodyValidator {

  @IsNotEmpty()
  @IsString()
  public email: string;

}