import Sidebar from "../components/sidebar/Sidebar.tsx";
import PageTitle from "../components/PageTitle.tsx";
import SubareaTable from "../components/table/SubareaTable.tsx";

export const SubareaPage = () => {
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