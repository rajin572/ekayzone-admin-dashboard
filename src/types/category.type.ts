import { IMeta } from "./common.type";

export type CategoryContentType = "Video" | "Product" | "Service";

export interface ICategory {
  _id: string;
  displayId: string;
  name: string;
  icon?: string;
  type: CategoryContentType;
}

export interface IGetCategoriesResponse {
  success: boolean;
  statusCode: number;
  message: string;
  data: {
    data: ICategory[];
    meta: IMeta;
  };
}

export interface IGetCategoryDetailResponse {
  success: boolean;
  statusCode: number;
  message: string;
  data: ICategory;
}
