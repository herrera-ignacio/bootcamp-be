import Slot from "../entities/Slot";

const getSlotMock = () => Slot.build({
  createdAt : new Date().toDateString(),
  id        : 1,
  isDisabled: false,
  updatedAt : new Date().toDateString(),
});

export default getSlotMock;
