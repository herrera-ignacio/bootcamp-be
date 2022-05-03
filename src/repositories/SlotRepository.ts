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
      return this.find({
        relations: {
          room: true,
        },
        where: {
          room:
          {
            id: roomId,
          },
        },
      });
    },

    findById(id: number): Promise<Slot> {
      return this.findOne({ where: { id } });
    },

  });

export default slotRepository;
