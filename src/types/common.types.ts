export type Nullable<T> = T | null;

export interface IStrapiAttributes<T> {
  id: string;
  attributes: T;
}
interface IStrapiPagination {
  pagination: {
    page: number;
    pageSize: number;
    pageCount: number;
    total: number;
  };
}
export interface IStrapiResponse<T> {
  data: IStrapiAttributes<T>[];
  meta: Nullable<IStrapiPagination>;
}

export interface ISeo {
  metaTitle: string;
  metaDescription: string;
}
