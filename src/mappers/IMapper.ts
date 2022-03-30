export interface IMapper<T, K> {
  toDto(entity: T): K;
}
