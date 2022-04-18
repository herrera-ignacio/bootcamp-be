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

  public getAll: IRequestHandler = async (
    req, res,
  ) => {
    const escapePods = await this.escapePodService.getAll();

    res.status(200).json({
      data: escapePods.map((escapedPod) => this.escapePodMapper.toDto(escapedPod)),
    });
  };

  public getById: IRequestHandler = async (
    req, res,
  ) => {
    const id = Number(req.params.id);
    const escapePod = await this.escapePodService.getByKey(
      "id", id,
    );

    res.status(200).json({
      data: this.escapePodMapper.toDto(escapePod),
    });
  };


  public create: IRequestHandler = async (
    req, res,
  ) => {
    const escapePod = await this.escapePodService.create(req.body);

    res.status(201).json({ data: this.escapePodMapper.toDto(escapePod) });
  };


  public updateById: IRequestHandler = async (
    req, res,
  ) => {
    const id = Number(req.params.id);
    const escapedPod = await this.escapePodService.updateById(
      id,
      req.body,
    );

    res.status(200).json({
      data: this.escapePodMapper.toDto(escapedPod),
    });
  };

  public deleteById: IRequestHandler = async (
    req, res,
  ) => {
    const id = Number(req.params.id);

    await this.escapePodService.deleteById(id);

    res.sendStatus(204);

  };


}

export default EscapePodController;
