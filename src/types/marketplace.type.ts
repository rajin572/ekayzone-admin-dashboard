import { IMeta } from "./common.type";

export type MarketplaceItemType = "Product" | "Service";
export type ListingStatus = "Active" | "Inactive";
export type OrderStatus = "Placed" | "Dispatched" | "Completed";

export interface IMarketplaceListing {
  _id: string;
  displayId: string;
  productName: string;
  category: string;
  seller: string;
  amount: number;
  type: MarketplaceItemType;
  status: ListingStatus;
  views: number;
  listingDate: string;
}

export interface IMarketplaceOrder {
  _id: string;
  displayId: string;
  productName: string;
  buyer: string;
  seller: string;
  amount: number;
  type: MarketplaceItemType;
  status: OrderStatus;
  date: string;
}

export interface IGetMarketplaceListingsResponse {
  success: boolean;
  statusCode: number;
  message: string;
  data: {
    data: IMarketplaceListing[];
    meta: IMeta;
  };
}

export interface IGetMarketplaceOrdersResponse {
  success: boolean;
  statusCode: number;
  message: string;
  data: {
    data: IMarketplaceOrder[];
    meta: IMeta;
  };
}
