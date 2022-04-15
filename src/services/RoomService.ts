import RoomCreateBodyValidator from "../validators/Room/RoomCreateBodyValidator";
import roomRepository from "../repositories/RoomRepository";
import Room from "../entities/Room";
import IRepository from "../types/IRepository";


class RoomService {

  private getRepository(): IRepository<Room> {
    return roomRepository();
  }

  private static notFoundErrorMessage = (
    key: string, value: string | number,
  ) => `User ${key}:${value} not found`;

  public create = async ( roomData: RoomCreateBodyValidator ) => {
    const repo = this.getRepository();
    const user = await repo.save(roomData);

    return user;

  };

}

export default RoomService;
