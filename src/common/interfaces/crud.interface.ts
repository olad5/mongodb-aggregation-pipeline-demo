export interface CRUD<T, U, V> {
  list: (limit: number, page: number) => Promise<T>;
  create: (resource: U) => Promise<string>;
  readById: (id: string) => Promise<T | null>;
  patchById: (id: string, resource: V) => Promise<T>;
  deleteById: (id: string) => Promise<T | null>;
}
