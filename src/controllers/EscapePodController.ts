import { IRequestHandler } from "../types/IRequestHandler";
import EscapePodService from "../services/EscapePodService";
import EscapePod from "../entities/EscapePod";
import { IController } from "../types/IController";
import {
  EscapePodDto,
  EscapePodMapper,
} from "../mappers/EscapePodMapper";
import { IMapper } from "../mappers/IMapper";



class EscapePodController implements IController {
  protected readonly escapePodService;


  constructor(
    userService: EscapePodService = new EscapePodService(),
    userMapper: IMapper<EscapePod, EscapePodDto> = new EscapePodMapper(),
  ) {
    this.escapePodService = userService;
    this.userMapper = userMapper;
  }

  protected readonly userMapper;

  public create: IRequestHandler = async (
    req, res,
  ) => {
    const user = await this.escapePodService.create(req.body);

    res.status(201).json({ data: this.userMapper.toDto(user) });
  };

}

export default EscapePodController;
