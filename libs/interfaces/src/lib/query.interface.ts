export enum SortOrder {
  ASC = 1,
  DESC = -1,
}

export interface IQuery<T> {
  limit?: number;
  offset?: number;
  sortField?: keyof T;
  sortOrder?: SortOrder;
}
