import { Repository } from "typeorm";

type IRepository<T> = Repository<T> & {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  findById?(id: number, options?: any): Promise<T>;
  findByEmail?(email: string): Promise<T>;
};

export default IRepository;
