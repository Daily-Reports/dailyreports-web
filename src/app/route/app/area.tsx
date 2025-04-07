import Sidebar from "@/components/ui/sidebar/sidebar.tsx";
import PageTitle from "@/components/ui/page-title.tsx";
import AreaTable from "@/features/area/components/area-table.tsx";

const AreaRoute = () => {
  return (
    <div className="flex">
      <Sidebar />

      <div className="flex flex-col mx-5 mt-20">
        <PageTitle title="Areas" subtitle="Manage your areas" />
        <AreaTable />
      </div>
    </div>
  );
};

export default AreaRoute;
