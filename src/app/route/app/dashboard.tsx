import PageTitle from "@/components/ui/page-title.tsx";
import Sidebar from "@/components/ui/sidebar/sidebar.tsx";

const DashboardRoute = () => {
    return (
        <div className="flex">
            <Sidebar />

            <div className="flex flex-col mx-5 mt-20">
                <PageTitle title="Dashboard" />
            </div>
        </div>
    );
};

export default DashboardRoute;