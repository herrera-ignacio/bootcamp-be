import { Repository } from "typeorm";

type IBookingRepository<T> = Repository<T> & {
  findByIdAndDates?(id: number, startDate: string, endDate: string): Promise<T>;
};

export default IBookingRepository;
