import {
  IsBoolean,
  IsNotEmpty,
} from "class-validator";
import { SlotUpdateBody } from "../../types/Slot/SlotUpdateRequest";

class SlotUpdateBodyValidator implements SlotUpdateBody {
  [x: string]: boolean;

  @IsBoolean()
  @IsNotEmpty()
    isDisabled: boolean;

}

export default SlotUpdateBodyValidator;
