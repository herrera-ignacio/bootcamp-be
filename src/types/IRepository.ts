import { Repository } from "typeorm";

type IRepository<T> = Repository<T> & {
  findById?(id: number, options?:any):Promise<T>;
  findByEmail?(email:string):Promise<T>;
};

export default IRepository;