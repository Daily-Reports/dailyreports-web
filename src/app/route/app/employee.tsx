import PageTitle from "@/components/ui/page-title.tsx";
import Sidebar from "@/components/ui/sidebar/sidebar.tsx";
import EmployeeTable from "@/features/employee/components/employee-table.tsx";

const EmployeeRoute = () => {
  return (
    <div className="flex">
      <Sidebar />

      <div className="flex flex-col mx-5 mt-20">
        <PageTitle title="Employees" subtitle="Manage your employees" />
        <EmployeeTable />
      </div>
    </div>
  );
};

export default EmployeeRoute;
