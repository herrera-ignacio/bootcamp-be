import EscapePod from "../entities/EscapePod";

const getEscapePodMock = () => EscapePod.build({
  createdAt: new Date().toDateString(),
  id       : 1,
  updatedAt: new Date().toDateString(),
});

export default getEscapePodMock;

