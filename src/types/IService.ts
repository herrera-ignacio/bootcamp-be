/* eslint-disable @typescript-eslint/no-explicit-any */
export interface IService<T> {
  getAll?(): Promise<T[]>
  getByKey?(key: string, val: number | string, options: any): Promise<T>;
  getById?(id: number): Promise<T>;
  getById?(id: number, withUser?: boolean): Promise<T>;
  create?(data: any): Promise<T>;
  updateById?(id: number, data: any): Promise<T>;
  deleteById?(id: number): Promise<void>;
}
