import Slot from "../entities/Slot";
import { IMapper } from "./IMapper";

export interface SlotDto {
  id: number;
  createdAt: string;
  updatedAt: string;
  isDisabled: boolean;
}

/**
 * Slot mapper for serializing
 */

export class SlotMapper implements IMapper<Slot, SlotDto> {

  toDto(slot: Slot): SlotDto {
    return {
      createdAt : slot.createdAt,
      id        : slot.id,
      isDisabled: slot.isDisabled,
      updatedAt : slot.updatedAt,
    };
  }
}
