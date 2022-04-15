import RoomCreateBodyValidator from "../validators/Room/RoomCreateBodyValidator";
import roomRepository from "../repositories/RoomRepository";
import Room from "../entities/Room";
import IRepository from "../types/IRepository";
import { IService } from "../types/IService";
import NotImplementedException from "../exceptions/NotImplementedException";


class RoomService implements IService<Room> {

  private getRepository(): IRepository<Room> {
    return roomRepository();
  }

  private static notFoundErrorMessage = (
    key: string, value: string | number,
  ) => `User ${key}:${value} not found`;

  getAll(): Promise<Room[]> {
    throw new NotImplementedException();
  }

  getByKey(): Promise<Room> {
    throw new NotImplementedException();
  }

  public async create( roomData: RoomCreateBodyValidator ): Promise<Room> {
    const repo = this.getRepository();
    const user = await repo.save(roomData);

    return user;

  }

  updateById(): Promise<Room> {
    throw new NotImplementedException();
  }

  deleteById(): Promise<void> {
    throw new NotImplementedException();
  }

}

export default RoomService;
