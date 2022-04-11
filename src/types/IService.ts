/* eslint-disable @typescript-eslint/no-explicit-any */
export interface IService<T> {
  getAll(): Promise<T[]>
  getById(id: number, options: any): Promise<T>;
  create(data: any): Promise<T>;
  updateById(id: number, data: any): Promise<T>;
  deleteById(id: number): Promise<void>;
}
