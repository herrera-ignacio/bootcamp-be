import {
  IsOptional,
  IsString,
  IsBoolean,
  IsNotEmpty,
} from "class-validator";
import { RoomUpdateBody } from "../../types/Room/RoomUpdateRequest";

/**
   * Validate room's update request body
   */
export default class RoomUpdateBodyValidator implements RoomUpdateBody {
  [x: string]: string | boolean;

  @IsString()
  @IsNotEmpty()
  @IsOptional()
  public name: string;

  @IsBoolean()
  @IsOptional()
  public isDisabled: boolean;
}
