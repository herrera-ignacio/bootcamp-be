import Booking from "../../entities/Booking";
import IRepository from "../IRepository";

type IBookingRepository = IRepository<Booking> & {
  findById?(id: number, withUser: boolean): Promise<Booking>;
  findBySlotIdAndDates?(id: number, startDate: string, endDate: string): Promise<Booking[]>;
  findByUserIdAndDates?(id: number, startDate: string, endDate: string): Promise<Booking[]>;
};

export default IBookingRepository;
