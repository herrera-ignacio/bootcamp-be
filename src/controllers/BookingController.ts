import { IController } from "../types/IController";
import BookingService from "../services/BookingService";
import { IRequestHandler } from "../types/IRequestHandler";
import BookingMapper from "../mappers/BookingMapper";

class BookingController implements IController {

  private readonly bookingService: BookingService;

  private readonly bookingMapper: BookingMapper;

  constructor(
    bookingService: BookingService = new BookingService(),
    bookingMapper: BookingMapper = new BookingMapper(),
  ) {
    this.bookingService = bookingService;
    this.bookingMapper = bookingMapper;
  }

  public create: IRequestHandler = async (
    req, res,
  ) => {

    const booking = await this.bookingService.create(req.body);

    res.status(201).json({
      data: this.bookingMapper.toDto(booking),
    });
  };

}

export default BookingController;
