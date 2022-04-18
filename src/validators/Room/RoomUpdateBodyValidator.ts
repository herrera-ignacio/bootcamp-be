import {
  IsNotEmpty,
  IsString,
} from "class-validator";
import { RoomUpdateBody } from "../../types/Room/RoomUpdateRequest";

/**
   * Validate room's update request body
   */
export default class RoomUpdateBodyValidator implements RoomUpdateBody {
  [x: string]: string;

  @IsString()
  @IsNotEmpty()
  public name: string;
}
