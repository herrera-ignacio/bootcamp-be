import {
  IsNotEmpty,
  IsString,
  IsBoolean,
  IsOptional,
} from "class-validator";
import { RoomCreateBody } from "../../types/Room/RoomCreateRequest";

/**
   * Validate room create request body
   */
export default class RoomCreateBodyValidator implements RoomCreateBody {
  [x: string]: string | boolean;

  @IsString()
  @IsNotEmpty()
  public name: string;

  @IsBoolean()
  @IsOptional()
  public isDisabled?: boolean;

}
