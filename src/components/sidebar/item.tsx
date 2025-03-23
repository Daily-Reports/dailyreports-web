import React, {ReactElement} from "react";
import {Link} from "react-router-dom";

type SidebarItemProps = {
    to: string;
    icon: ReactElement;
    label: string;
    isCompact: boolean;
};

const SidebarItem: React.FC<SidebarItemProps> = ({to, icon, label, isCompact}) => {
    return (
        <li>
            <Link
                to={to}
                className="flex items-center py-2 px-4 rounded-none text-lg font-medium hover:bg-gray-200 hover:text-white transition duration-200"
                title={label}
            >
                <span className="mr-2">{icon}</span>
                {!isCompact && label}
            </Link>
        </li>
    );
};

export default SidebarItem;