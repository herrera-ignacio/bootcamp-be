import {
  IsNotEmpty,
  IsString,
} from "class-validator";
import { RoomCreateBody } from "../../types/Room/RoomCreateRequest";

/**
   * Validate room create request body
   */
export default class RoomCreateBodyValidator implements RoomCreateBody {
  [x: string]: string;

  @IsString()
  @IsNotEmpty()
  public name: string;

}
