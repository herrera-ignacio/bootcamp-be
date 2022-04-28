import Booking from "../../entities/Booking";
import IRepository from "../IRepository";

type IBookingRepository = IRepository<Booking> & {
  findByIdAndDates?(
    {
      entity, entityId,
    }: Record<string, string | number>,
    startDate: string,
    endDate: string,
  ): Promise<Booking[]>;
};

export default IBookingRepository;
