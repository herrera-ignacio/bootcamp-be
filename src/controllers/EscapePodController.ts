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
    escapePodService: EscapePodService = new EscapePodService(),
    escapePodMapper: IMapper<EscapePod, EscapePodDto> = new EscapePodMapper(),
  ) {
    this.escapePodService = escapePodService;
    this.escapePodMapper = escapePodMapper;
  }

  protected readonly escapePodMapper;

  public create: IRequestHandler = async (
    req, res,
  ) => {
    const escapePod = await this.escapePodService.create(req.body);

    res.status(201).json({ data: this.escapePodMapper.toDto(escapePod) });
  };

}

export default EscapePodController;
