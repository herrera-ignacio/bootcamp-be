import Slot from "../../entities/Slot";
import IRepository from "../IRepository";

type ISlotRepository = IRepository<Slot> & {

  findAllSlotsByRoomId?(roomId: number): Promise<Slot[]>;
  disableSlotsByRoomId?(roomId: number): Promise<void>;
};

export default ISlotRepository;
