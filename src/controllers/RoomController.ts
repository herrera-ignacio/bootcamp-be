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
    const user = await this.roomService.getByKey(
      "id", id,
    );

    res.status(200).json({
      data: this.roomMapper.toDto(user),
    });
  };

  public create: IRequestHandler = async (
    req,
    res,
  ) => {

    const user = await this.roomService.create(req.body);

    res.status(201).json({
      data: this.roomMapper.toDto(user),
    });

  };

}

export default RoomController;
