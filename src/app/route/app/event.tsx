import Sidebar from '@/components/ui/sidebar/sidebar.tsx';
import PageTitle from "@/components/ui/page-title.tsx";
import EventTable from "@/features/event/components/event-table.tsx";

const EventRoute = () => {
    return (
        <div className="flex">
            <Sidebar />

            <div className="flex flex-col mx-5 mt-20">
                <PageTitle title="Events" subtitle="Manage your events" />
                <EventTable />
            </div>
        </div>
    );
};

export default EventRoute;