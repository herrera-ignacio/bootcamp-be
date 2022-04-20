import {
  IsBoolean,
  IsNotEmpty,
} from "class-validator";
import { SlotCreateBody } from "../../types/Slot/SlotCreateRequest";

/*
 * Validate slot body create request
 */

export default class SlotCreateBodyValidator implements SlotCreateBody {
  [x: string]: string | boolean,

  @IsBoolean()
  @IsNotEmpty()
  public isDisabled: boolean;

}
