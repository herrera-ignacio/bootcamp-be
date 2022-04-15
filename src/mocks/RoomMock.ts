import Room from "../entities/Room";

const getRoomMock = () => Room.build({
  createdAt: new Date().toDateString(),
  id       : 1,
  name     : "Room",
  updatedAt: new Date().toDateString(),
});

export default getRoomMock;
