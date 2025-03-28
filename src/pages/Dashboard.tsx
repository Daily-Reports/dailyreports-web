import Sidebar from "../components/sidebar/Sidebar.tsx";
import PageTitle from "../components/PageTitle.tsx";

export const Dashboard = () => {
    return (
        <div className="flex">
            <Sidebar />

            <div className="flex flex-col mx-5 mt-20">
                <PageTitle title="Dashboard" />
            </div>
        </div>
    );
};