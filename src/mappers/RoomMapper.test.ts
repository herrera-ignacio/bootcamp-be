import { RoomMapper } from "./RoomMapper";
import getRoomMock from "../mocks/RoomMock";

describe(
  "RoomMapper", () => {

    it(
      "Room to UserDto", () => {

        const room = getRoomMock();
        const roomDto = new RoomMapper().toDto(room);


        expect(roomDto).toEqual({
          createdAt: new Date(room.createdAt),
          id       : room.id,
          name     : room.name,
          updatedAt: new Date(room.updatedAt),
        });

      },
    );
  },
);
