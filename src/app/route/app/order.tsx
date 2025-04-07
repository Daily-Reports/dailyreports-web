import Sidebar from "@/components/ui/sidebar/sidebar.tsx";
import PageTitle from "@/components/ui/page-title.tsx";
import OrderTable from "@/features/order/components/order-table.tsx";

const OrderRoute = () => {
  return (
    <div className="flex">
      <Sidebar />

      <div className="flex flex-col mx-5 mt-20">
        <PageTitle title="Orders" subtitle="Manage your orders" />
        <OrderTable />
      </div>
    </div>
  );
};

export default OrderRoute;
