import {
  IsInt,
  IsNotEmpty,
} from "class-validator";
import { Type } from "class-transformer";

/**
 * Validate user's id
 */
export default class BaseParamsValidator {
  @IsInt()
  @IsNotEmpty()
  @Type(() => Number)
  public id: number;
}
