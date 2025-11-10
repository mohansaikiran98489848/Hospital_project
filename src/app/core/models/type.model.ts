export interface TypeDto {
  id: number;
  parentId?: number | null;
  typeName: string;
  description?: string | null;
  parentName?: string | null;
}

export interface PagedResult<T> {
  totalCount: number;
  data: T[];
}
