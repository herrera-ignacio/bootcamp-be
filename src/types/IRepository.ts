import { Repository } from "typeorm";

type IRepository<T> = Repository<T> & {
  findOneByKey?(kew: string, val: string | number): Promise<T>;
};

export default IRepository;
