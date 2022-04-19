import { IController } from "../types/IController";
import { IRequestHandler } from "../types/IRequestHandler";
import RoomService from "../services/RoomService";
import { RoomMapper } from "../mappers/RoomMapper";


class RoomController implements IController {

  private readonly roomService;

  private readonly roomMapper;

  constructor(
    roomService: RoomService = new RoomService(),
    roomMapper: RoomMapper = new RoomMapper(),
  ) {
    this.roomService = roomService;
    this.roomMapper  = roomMapper;

  }

  public getById: IRequestHandler = async (
    req,
    res,
  ) => {
    const id = Number(req.params.id);
    const room = await this.roomService.getByKey(
      "id", id,
    );

    res.status(200).json({
      data: this.roomMapper.toDto(room),
    });
  };

  public create: IRequestHandler = async (
    req,
    res,
  ) => {

    const room = await this.roomService.create(req.body);

    res.status(201).json({
      data: this.roomMapper.toDto(room),

    });

  };

  public updateById: IRequestHandler = async (
    req,
    res,
  ) => {
    const id = Number(req.params.id);
    const room = await this.roomService.updateById(
      id,
      req.body,
    );

    res.status(200).json({
      data: this.roomMapper.toDto(room),

    });

  };

  public deleteById: IRequestHandler = async (
    req,
    res,
  ) => {
    const id = Number(req.params.id);

    await this.roomService.deleteById(id);

    res.sendStatus(204);
  };

}

export default RoomController;
