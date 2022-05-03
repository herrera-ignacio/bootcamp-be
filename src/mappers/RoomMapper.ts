import Room from "../entities/Room";
import { IMapper } from "./IMapper";


export interface RoomDto {
  id: number,
  createdAt: Date,
  updatedAt: Date,
  name: string;
  isDisabled: boolean,
}

/**
 * Room mapper for serializing
 */

export class RoomMapper implements IMapper<Room, RoomDto> {

  toDto(room: Room): RoomDto {
    return {
      createdAt : new Date(room.createdAt),
      id        : room.id,
      isDisabled: room.isDisabled,
      name      : room.name,
      updatedAt : new Date(room.updatedAt),
    };
  }

}



