import React, {useEffect, useRef} from 'react';
import {
    IconCalendar,
    IconClipboardList,
    IconDashboard,
    IconFileStack,
    IconFileText,
    IconLogout,
    IconMap,
    IconSwitchVertical,
    IconUsers
} from '@tabler/icons-react';
import SidebarItem from "./sidebar-item.tsx";
import {useAuthStore} from "@/stores/authStore.tsx";
import {useSidebarStore} from "@/stores/sidebarStore.tsx";

const Sidebar: React.FC = () => {
    const {user, logout} = useAuthStore();
    const {isProfileOpen, toggleProfile, closeProfile} = useSidebarStore();
    const dropdownRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                closeProfile();
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, [closeProfile]);

    return (
        <div
            className={`h-[calc(100vh-1rem)] bg-gray-100 text-black p-3 flex flex-col justify-between shadow-lg mx-2 my-2 border border-gray-200 rounded-lg transition-all`}
            style={{width:'16rem'}}
        >
            <div>
                <h3 className={`text-lg font-semibold mt-6 pl-4 text-gray-500`}>
                    General
                </h3>

                <ul className="space-y-1">
                    <SidebarItem to="/" icon={<IconDashboard />} label="Dashboard"/>
                    <SidebarItem to="/reports" icon={<IconFileText />} label="Reports"/>
                    <SidebarItem to="/employees" icon={<IconUsers />} label="Employees"/>
                    <SidebarItem
                        icon={<IconFileStack />}
                        label="Order Book"
                        subItems={[
                            { to: "/orders", label: "Orders", icon: <IconClipboardList /> },
                            { to: "/events", label: "Events", icon: <IconCalendar  /> },
                            { to: "/areas", label: "Areas", icon: <IconMap  /> },
                            { to: "/subareas", label: "Subareas", icon: <IconMap  /> }
                        ]}
                    />
                </ul>

                {user?.role === "ADMIN" && (
                    <div className="mt-8">
                        <h3 className={`text-lg font-semibold pl-4 text-gray-500`}>
                            Admin
                        </h3>
                        <ul className="space-y-1">
                            <SidebarItem to="/users" icon={<IconUsers />} label="Users"/>
                        </ul>
                    </div>
                )}
            </div>

            <div className="mt-auto relative" ref={dropdownRef}>
                <button
                    onClick={toggleProfile}
                    className="flex items-center justify-between w-full py-2 px-2 rounded-lg text-lg font-medium  hover:bg-gray-200 transition duration-200"
                    aria-label="Perfil"
                >
                    <div className="flex flex-col text-left leading-tight">
                        <p className="text-gray-700">{user?.username || "Usuário"}</p>
                        <p className="text-gray-900 text-xs font-semibold">{user?.email}</p>
                    </div>

                    <IconSwitchVertical size={20} className="text-gray-600" />
                </button>

                {isProfileOpen && (
                    <div className="absolute bottom-15 w-full bg-white shadow-md rounded-lg p-3">
                        <button
                            onClick={logout}
                            className="flex items-center w-full py-2 px-4 text-red-600 bg-red-100 rounded-lg hover:bg-red-200 transition duration-200"
                            aria-label="Sair"
                        >
                            <IconLogout className="mr-2" size={25} />
                            Sair
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Sidebar;