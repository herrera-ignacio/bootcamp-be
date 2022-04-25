import { Repository } from "typeorm";


type IBookingRepository<Booking> = Repository<Booking> & {
  findByIdAndDates?(id: number, startDate: string, endDate: string): Promise<Booking[]>;
};

export default IBookingRepository;
