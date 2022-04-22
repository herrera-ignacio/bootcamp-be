import { Repository } from "typeorm";

type IRepository<T> = Repository<T> & {
  findOneByKey?(kew: string, val: string | number): Promise<T>;
  findByIdAndDates?(id: number, startDate: string, endDate: string): Promise<T>;
};

export default IRepository;
