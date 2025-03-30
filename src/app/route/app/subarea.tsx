import Sidebar from '@/components/ui/sidebar/sidebar.tsx';
import PageTitle from "@/components/ui/page-title.tsx";
import SubareaTable from "@/features/subarea/components/subarea-table.tsx";

const SubareaRoute = () => {
    return (
        <div className="flex">
            <Sidebar />

            <div className="flex flex-col mx-5 mt-20">
                <PageTitle title="Subareas" subtitle="Manage your subareas" />
                <SubareaTable />
            </div>
        </div>
    );
};

export default SubareaRoute;