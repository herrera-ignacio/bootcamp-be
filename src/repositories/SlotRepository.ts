import Database from "../providers/Database";
import Slot from "../entities/Slot";
import ISlotRepository from "../types/Slot/ISlotRepository";

const slotRepository = (): ISlotRepository => Database.getConnection()
  .getRepository(Slot).extend({
    disableSlotsByRoomId(roomId: number): Promise<void> {
      return this.createQueryBuilder()
        .update(Slot)
        .set({ isDisabled: true })
        .where(
          "roomId = :roomId", { roomId },
        )
        .execute();
    },

    findAllSlotsByRoomId(roomId: number): Promise<Slot[]> {
      return this.createQueryBuilder()
        .select("slot")
        .from(
          Slot, "slot",
        )
        .where(
          "slot.roomId = :roomId",
          { roomId },
        )
        .getMany();
    },


  });

export default slotRepository;
