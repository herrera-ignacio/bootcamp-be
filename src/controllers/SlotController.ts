import { IController } from "../types/IController";
import SlotService from "../services/SlotService";
import { IRequestHandler } from "../types/IRequestHandler";
import SlotMapper from "../mappers/SlotMapper";

class SlotController implements IController {

  private readonly slotService: SlotService;

  private readonly slotMapper: SlotMapper;

  constructor(
    slotService: SlotService = new SlotService(),
    slotMapper: SlotMapper = new SlotMapper(),
  ) {
    this.slotService = slotService;
    this.slotMapper = slotMapper;
  }

  public create: IRequestHandler = async (
    req, res,
  ) => {
    const slot = await this.slotService.create(req.body);

    res.status(201).json({
      data: this.slotMapper.toDto(slot),
    });
  };

}

export default SlotController;
