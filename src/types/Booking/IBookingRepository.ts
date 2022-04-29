import Booking from "../../entities/Booking";
import IRepository from "../IRepository";

type IBookingRepository = IRepository<Booking> & {
  findBySlotIdAndDates?(id: number, startDate: string, endDate: string): Promise<Booking[]>;
  findByUserIdAndDates?(id: number, startDate: string, endDate: string): Promise<Booking[]>;
};

export default IBookingRepository;
