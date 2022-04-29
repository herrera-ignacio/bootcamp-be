import {
  IsBoolean,
  IsNotEmpty,
} from "class-validator";
import { RoomDisableBody } from "../../types/Room/RoomDisableRequest";

/**
     * Validate room's disable request body
     */
export default class RoomDisableBodyValidator implements RoomDisableBody {
  [x: string]: boolean;

  @IsBoolean()
  @IsNotEmpty()
  public isDisabled: boolean;
}
