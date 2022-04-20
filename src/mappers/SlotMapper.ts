import Slot from "../entities/Slot";
import { IMapper } from "./IMapper";

export interface SlotDto{
  id: number,
  createdAt: Date,
  updatedAt: Date,
  isDisabled: boolean,
}

class SlotMapper implements IMapper<Slot, SlotDto> {
  toDto(slot: Slot): SlotDto {
    return {
      createdAt : new Date(slot.createdAt),
      id        : slot.id,
      isDisabled: slot.isDisabled,
      updatedAt : new Date(slot.updatedAt),
    };

  }
}

export default SlotMapper;
