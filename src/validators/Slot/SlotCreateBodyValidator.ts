import {
  IsBoolean,
  IsInt,
  IsNotEmpty,
  IsOptional,
} from "class-validator";
import { SlotCreateBody } from "../../types/Slot/SlotCreateRequest";

/**
 * Validate slot create request body
 */
export default class SlotCreateBodyValidator implements SlotCreateBody {
  [x: string]: boolean | number;

  @IsNotEmpty()
  @IsInt()
  public roomId: number;

  @IsBoolean()
  @IsOptional()
  public isDisabled?: boolean;
}
