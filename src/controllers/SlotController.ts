import { IRequestHandler } from "../types/IRequestHandler";
import Slot from "../entities/Slot";
import { IMapper } from "../mappers/IMapper";
import {
  SlotDto,
  SlotMapper,
} from "../mappers/SlotMapper";
import SlotService from "../services/SlotService";
import { IController } from "../types/IController";

class SlotController implements IController {
  protected readonly slotService;

  protected readonly slotMapper: IMapper<Slot, SlotDto>;

  constructor(
    slotService: SlotService = new SlotService(),
    slotMapper: IMapper<Slot, SlotDto> = new SlotMapper(),
  ) {
    this.slotService = slotService;
    this.slotMapper = slotMapper;
  }

  public create: IRequestHandler = async (
    req, res,
  ) => {
    const slot = await this.slotService.create(req.body);

    res.status(201).json({ data: this.slotMapper.toDto(slot) });
  };
}

export default SlotController;
