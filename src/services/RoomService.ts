import RoomCreateBodyValidator from "../validators/Room/RoomCreateBodyValidator";
import roomRepository from "../repositories/RoomRepository";
import Room from "../entities/Room";
import IRepository from "../types/IRepository";
import { IService } from "../types/IService";
import NotImplementedException from "../exceptions/NotImplementedException";
import NotFoundException from "../exceptions/NotFoundException";


class RoomService implements IService<Room> {

  public getRepository(): IRepository<Room> {
    return roomRepository();
  }

  private static notFoundErrorMessage = (
    key: string, value: string | number,
  ) => `room ${key}:${value} not found`;

  getAll(): Promise<Room[]> {
    throw new NotImplementedException();
  }

  public async getByKey(
    key: string, val: string | number,
  ): Promise<Room> {
    const repo = this.getRepository();
    const room = await repo.findOneBy({ [key]: val });

    if (!room) {
      throw new NotFoundException(RoomService.notFoundErrorMessage(
        key,
        val,
      ));
    }

    return room;
  }

  public async create( roomData: RoomCreateBodyValidator ): Promise<Room> {
    const repo = this.getRepository();
    const room = await repo.save(roomData);

    return room;

  }

  updateById(): Promise<Room> {
    throw new NotImplementedException();
  }

  deleteById(): Promise<void> {
    throw new NotImplementedException();
  }

}

export default RoomService;
