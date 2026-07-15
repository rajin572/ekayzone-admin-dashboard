import { useState } from "react";
import { Trash2 } from "lucide-react";
import PageWraper from "@/Components/ui/CustomUi/PageWraper";
import ReuseTabs from "@/Components/ui/CustomUi/ReuseTabs";
import ReuseSearchInput from "@/Components/ui/CustomUi/ReuseForm/ReuseSearchInput";
import ReuseFilterSelect, { FilterOption } from "@/Components/ui/CustomUi/ReuseForm/ReuseFilterSelect";
import ReusableTable, { Column } from "@/Components/ui/CustomUi/ReuseableTable";
import ConfirmModal from "@/Components/ui/CustomUi/Modal/ConfirmModal";
import { IMarketplaceListing, IMarketplaceOrder } from "@/types";
// import { useGetMarketplaceListingsQuery, useDeleteMarketplaceListingMutation, useGetMarketplaceOrdersQuery } from "@/redux/features/marketplace/marketplaceApi";
// import tryCatchWrapper from "@/utils/tryCatchWrapper";

// TODO: replace with real marketplace-listings API data once the endpoint exists.
const DUMMY_LISTINGS: IMarketplaceListing[] = [
  { _id: "1", displayId: "2345", productName: "iPhone 15 Pro", category: "Electronics", seller: "Jason Durham", amount: 700, type: "Product", status: "Active", views: 342, listingDate: "4/4/26" },
  { _id: "2", displayId: "2345", productName: "iPhone 15 Pro", category: "Electronics", seller: "Jason Durham", amount: 700, type: "Service", status: "Active", views: 342, listingDate: "4/4/26" },
  { _id: "3", displayId: "2345", productName: "iPhone 15 Pro", category: "Electronics", seller: "Jason Durham", amount: 700, type: "Product", status: "Active", views: 342, listingDate: "4/4/26" },
  { _id: "4", displayId: "2345", productName: "iPhone 15 Pro", category: "Electronics", seller: "Jason Durham", amount: 700, type: "Product", status: "Active", views: 342, listingDate: "4/4/26" },
  { _id: "5", displayId: "2345", productName: "iPhone 15 Pro", category: "Electronics", seller: "Jason Durham", amount: 700, type: "Product", status: "Active", views: 342, listingDate: "4/4/26" },
  { _id: "6", displayId: "2345", productName: "iPhone 15 Pro", category: "Electronics", seller: "Jason Durham", amount: 700, type: "Product", status: "Active", views: 342, listingDate: "4/4/26" },
  { _id: "7", displayId: "2345", productName: "iPhone 15 Pro", category: "Electronics", seller: "Jason Durham", amount: 700, type: "Product", status: "Active", views: 342, listingDate: "4/4/26" },
  { _id: "8", displayId: "2345", productName: "iPhone 15 Pro", category: "Electronics", seller: "Jason Durham", amount: 700, type: "Product", status: "Active", views: 342, listingDate: "4/4/26" },
  { _id: "9", displayId: "2345", productName: "iPhone 15 Pro", category: "Electronics", seller: "Jason Durham", amount: 700, type: "Product", status: "Active", views: 342, listingDate: "4/4/26" },
  { _id: "10", displayId: "2345", productName: "iPhone 15 Pro", category: "Electronics", seller: "Jason Durham", amount: 700, type: "Service", status: "Active", views: 342, listingDate: "4/4/26" },
  { _id: "11", displayId: "2345", productName: "iPhone 15 Pro", category: "Electronics", seller: "Jason Durham", amount: 700, type: "Service", status: "Active", views: 342, listingDate: "4/4/26" },
  { _id: "12", displayId: "2345", productName: "iPhone 15 Pro", category: "Electronics", seller: "Jason Durham", amount: 700, type: "Service", status: "Active", views: 342, listingDate: "4/4/26" },
  { _id: "13", displayId: "2345", productName: "iPhone 15 Pro", category: "Electronics", seller: "Jason Durham", amount: 700, type: "Product", status: "Active", views: 342, listingDate: "4/4/26" },
  { _id: "14", displayId: "2345", productName: "iPhone 15 Pro", category: "Electronics", seller: "Jason Durham", amount: 700, type: "Service", status: "Active", views: 342, listingDate: "4/4/26" },
];

// TODO: replace with real marketplace-orders API data once the endpoint exists.
const DUMMY_ORDERS: IMarketplaceOrder[] = [
  { _id: "1", displayId: "2345", productName: "iPhone 15 Pro", buyer: "Alex Mason", seller: "Jason Durham", amount: 700, type: "Product", status: "Completed", date: "4/4/26" },
  { _id: "2", displayId: "2345", productName: "iPhone 15 Pro", buyer: "Alex Mason", seller: "Jason Durham", amount: 700, type: "Service", status: "Completed", date: "4/4/26" },
  { _id: "3", displayId: "2345", productName: "iPhone 15 Pro", buyer: "Alex Mason", seller: "Jason Durham", amount: 700, type: "Product", status: "Dispatched", date: "4/4/26" },
  { _id: "4", displayId: "2345", productName: "iPhone 15 Pro", buyer: "Alex Mason", seller: "Jason Durham", amount: 700, type: "Product", status: "Dispatched", date: "4/4/26" },
  { _id: "5", displayId: "2345", productName: "iPhone 15 Pro", buyer: "Alex Mason", seller: "Jason Durham", amount: 700, type: "Product", status: "Completed", date: "4/4/26" },
  { _id: "6", displayId: "2345", productName: "iPhone 15 Pro", buyer: "Alex Mason", seller: "Jason Durham", amount: 700, type: "Product", status: "Dispatched", date: "4/4/26" },
  { _id: "7", displayId: "2345", productName: "iPhone 15 Pro", buyer: "Alex Mason", seller: "Jason Durham", amount: 700, type: "Product", status: "Dispatched", date: "4/4/26" },
  { _id: "8", displayId: "2345", productName: "iPhone 15 Pro", buyer: "Alex Mason", seller: "Jason Durham", amount: 700, type: "Product", status: "Dispatched", date: "4/4/26" },
  { _id: "9", displayId: "2345", productName: "iPhone 15 Pro", buyer: "Alex Mason", seller: "Jason Durham", amount: 700, type: "Service", status: "Dispatched", date: "4/4/26" },
  { _id: "10", displayId: "2345", productName: "iPhone 15 Pro", buyer: "Alex Mason", seller: "Jason Durham", amount: 700, type: "Service", status: "Dispatched", date: "4/4/26" },
  { _id: "11", displayId: "2345", productName: "iPhone 15 Pro", buyer: "Alex Mason", seller: "Jason Durham", amount: 700, type: "Service", status: "Placed", date: "4/4/26" },
  { _id: "12", displayId: "2345", productName: "iPhone 15 Pro", buyer: "Alex Mason", seller: "Jason Durham", amount: 700, type: "Product", status: "Placed", date: "4/4/26" },
  { _id: "13", displayId: "2345", productName: "iPhone 15 Pro", buyer: "Alex Mason", seller: "Jason Durham", amount: 700, type: "Service", status: "Placed", date: "4/4/26" },
  { _id: "14", displayId: "2345", productName: "iPhone 15 Pro", buyer: "Alex Mason", seller: "Jason Durham", amount: 700, type: "Product", status: "Dispatched", date: "4/4/26" },
];

const TAB_OPTIONS = [
  { label: "All Listings", value: "listings" },
  { label: "Orders", value: "orders" },
];

const TYPE_OPTIONS: FilterOption[] = [
  { label: "All Types", value: "all" },
  { label: "Product", value: "Product" },
  { label: "Service", value: "Service" },
];

const STATUS_OPTIONS: FilterOption[] = [
  { label: "All Status", value: "all" },
  { label: "Active", value: "Active" },
  { label: "Inactive", value: "Inactive" },
];

const headerCls = "text-sm font-semibold text-base-color";
const cellCls = "text-sm text-base-color";

const MarketplacePage = () => {
  const [activeTab, setActiveTab] = useState<"listings" | "orders">("listings");
  const [, setSearch] = useState("");
  const [typeFilter, setTypeFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const limit = 14;

  const [selectedListing, setSelectedListing] = useState<IMarketplaceListing | null>(null);
  const [isDeleteConfirmOpen, setIsDeleteConfirmOpen] = useState(false);

  const handleTabChange = (tab: string) => {
    setActiveTab(tab as "listings" | "orders");
    setSearch("");
    setCurrentPage(1);
  };

  // const { data: listingsData } = useGetMarketplaceListingsQuery(
  //   {
  //     page: currentPage,
  //     limit,
  //     searchParams: search.length > 0 ? search : undefined,
  //     type: typeFilter === "all" ? undefined : typeFilter,
  //     status: statusFilter === "all" ? undefined : statusFilter,
  //   },
  //   { skip: activeTab !== "listings", refetchOnMountOrArgChange: true }
  // );
  // const listings = listingsData?.data?.data ?? [];
  // const listingsTotal = listingsData?.data?.meta?.total ?? 0;
  const listings = DUMMY_LISTINGS;
  const listingsTotal = 250;

  // const { data: ordersData } = useGetMarketplaceOrdersQuery(
  //   { page: currentPage, limit, searchParams: search.length > 0 ? search : undefined },
  //   { skip: activeTab !== "orders", refetchOnMountOrArgChange: true }
  // );
  // const orders = ordersData?.data?.data ?? [];
  // const ordersTotal = ordersData?.data?.meta?.total ?? 0;
  const orders = DUMMY_ORDERS;
  const ordersTotal = 250;

  // const [deleteMarketplaceListing] = useDeleteMarketplaceListingMutation();
  const handleConfirmDelete = async (_listing: IMarketplaceListing) => {
    // const res = await tryCatchWrapper(
    //   deleteMarketplaceListing,
    //   { params: { id: _listing._id } },
    //   { toastLoadingMessage: "Deleting listing..." }
    // );
    // if (res?.success) setIsDeleteConfirmOpen(false);
    setIsDeleteConfirmOpen(false);
  };

  const listingColumns: Column<IMarketplaceListing>[] = [
    { header: "ID", accessorKey: "displayId", headerClassName: headerCls, cellClassName: cellCls },
    { header: "Product Name", accessorKey: "productName", headerClassName: headerCls, cellClassName: cellCls },
    { header: "Category", accessorKey: "category", headerClassName: headerCls, cellClassName: cellCls },
    { header: "Seller", accessorKey: "seller", headerClassName: headerCls, cellClassName: cellCls },
    {
      header: "Amount",
      accessorKey: "amount",
      headerClassName: headerCls,
      cellClassName: cellCls,
      render: (value: number) => <span>${value}</span>,
    },
    { header: "Type", accessorKey: "type", headerClassName: headerCls, cellClassName: cellCls },
    { header: "Status", accessorKey: "status", headerClassName: headerCls, cellClassName: cellCls },
    { header: "Views", accessorKey: "views", headerClassName: headerCls, cellClassName: cellCls },
    { header: "Listing Date", accessorKey: "listingDate", headerClassName: headerCls, cellClassName: cellCls },
    {
      header: "Action",
      accessorKey: "_id",
      headerClassName: headerCls,
      cellClassName: cellCls,
      render: (_, row) => (
        <button
          type="button"
          onClick={() => {
            setSelectedListing(row);
            setIsDeleteConfirmOpen(true);
          }}
          className="p-2 rounded-lg bg-error hover:bg-error/90 transition-colors cursor-pointer"
          aria-label={`Delete ${row.productName}`}
        >
          <Trash2 className="size-4 text-white" />
        </button>
      ),
    },
  ];

  const orderColumns: Column<IMarketplaceOrder>[] = [
    { header: "ID", accessorKey: "displayId", headerClassName: headerCls, cellClassName: cellCls },
    { header: "Product Name", accessorKey: "productName", headerClassName: headerCls, cellClassName: cellCls },
    { header: "Buyer", accessorKey: "buyer", headerClassName: headerCls, cellClassName: cellCls },
    { header: "Seller", accessorKey: "seller", headerClassName: headerCls, cellClassName: cellCls },
    {
      header: "Amount",
      accessorKey: "amount",
      headerClassName: headerCls,
      cellClassName: cellCls,
      render: (value: number) => <span>${value}</span>,
    },
    { header: "Type", accessorKey: "type", headerClassName: headerCls, cellClassName: cellCls },
    { header: "Status", accessorKey: "status", headerClassName: headerCls, cellClassName: cellCls },
    { header: "Date", accessorKey: "date", headerClassName: headerCls, cellClassName: cellCls },
  ];

  return (
    <PageWraper title="Marketplace">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <ReuseTabs options={TAB_OPTIONS} value={activeTab} onChange={handleTabChange} variant="solid" />

        <div className="flex flex-wrap items-center gap-3">
          {activeTab === "listings" && (
            <>
              <ReuseFilterSelect
                options={TYPE_OPTIONS}
                value={typeFilter}
                onChange={(value) => {
                  setTypeFilter(value);
                  setCurrentPage(1);
                }}
                placeholder="Type"
                triggerClassName="rounded-full"
              />
              <ReuseFilterSelect
                options={STATUS_OPTIONS}
                value={statusFilter}
                onChange={(value) => {
                  setStatusFilter(value);
                  setCurrentPage(1);
                }}
                placeholder="Status"
                triggerClassName="rounded-full"
              />
            </>
          )}
          <ReuseSearchInput
            className="min-w-56"
            placeholder="Search..."
            setSearch={setSearch}
            setPage={setCurrentPage}
          />
        </div>
      </div>

      {activeTab === "listings" ? (
        <ReusableTable
          data={listings}
          columns={listingColumns}
          scroll={false}
          pagination
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          limit={limit}
          total={listingsTotal}
        />
      ) : (
        <ReusableTable
          data={orders}
          columns={orderColumns}
          scroll={false}
          pagination
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          limit={limit}
          total={ordersTotal}
        />
      )}

      <ConfirmModal<IMarketplaceListing>
        open={isDeleteConfirmOpen}
        onCancel={() => setIsDeleteConfirmOpen(false)}
        currentRecord={selectedListing}
        onConfirm={handleConfirmDelete}
        title="Delete Listing"
        description={`Are you sure you want to delete "${selectedListing?.productName}"? This action cannot be undone.`}
        confirmText="Delete"
        cancelText="Cancel"
        variant="danger"
        iconPreset="delete"
      />
    </PageWraper>
  );
};

export default MarketplacePage;
