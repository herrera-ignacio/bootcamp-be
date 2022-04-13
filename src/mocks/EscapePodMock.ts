import EscapePod from "../entities/EscapePod";


const getUserMock = () => EscapePod.build({
  createdAt: new Date().toDateString(),
  id       : 1,
  updatedAt: new Date().toDateString(),
});

export default getUserMock;
