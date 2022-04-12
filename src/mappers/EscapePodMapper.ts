/* eslint-disable class-methods-use-this */
import EscapePod from "../entities/EscapePod";
import { IMapper } from "./IMapper";

export interface EscapePodDto {
  id: number;
  createdAt: Date;
  updatedAt: Date;
}

/**
 * EscapePod Mapper for serializing.
 */
export class EscapePodMapper implements IMapper<EscapePod, EscapePodDto> {
  toDto(u: EscapePod): EscapePodDto {
    return {
      createdAt: new Date(u.createdAt),
      id       : u.id,
      updatedAt: new Date(u.updatedAt),
    };
  }
}
