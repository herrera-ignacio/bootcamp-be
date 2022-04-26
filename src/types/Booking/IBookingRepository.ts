import Booking from "../../entities/Booking";
import IRepository from "../IRepository";

type IBookingRepository = IRepository<Booking> & {
  findByIdAndDates?(id: number, startDate: string, endDate: string): Promise<Booking[]>;
};

export default IBookingRepository;
