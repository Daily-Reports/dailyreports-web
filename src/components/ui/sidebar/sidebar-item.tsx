import React, { ReactElement } from "react";
import { Link, useNavigate } from "react-router-dom";
import { IconChevronDown, IconChevronRight } from "@tabler/icons-react";

type SidebarItemProps = {
  to?: string;
  icon: ReactElement;
  label: string;
  subItems?: { to: string; label: string; icon: ReactElement }[];
  isOpen?: boolean;
  setOpen?: (open: boolean) => void;
};

const SidebarItem: React.FC<SidebarItemProps> = ({
  to,
  icon,
  label,
  subItems,
  isOpen,
  setOpen,
}) => {
  const navigate = useNavigate();

  return (
    <li className="relative">
      <button
        onClick={
          subItems
            ? () => setOpen?.(!isOpen)
            : to
              ? () => navigate(to)
              : undefined
        }
        className="flex items-center justify-between w-full py-2 px-4 rounded-none text-lg font-medium hover:bg-gray-200 transition duration-200"
        title={label}
      >
        <div className="flex items-center">
          <span className="mr-2">{icon}</span>
          <span>{label}</span>
        </div>
        {subItems &&
          (isOpen ? (
            <IconChevronDown size={18} />
          ) : (
            <IconChevronRight size={18} />
          ))}
      </button>

      {subItems && isOpen && (
        <ul className="pl-5 space-y-1">
          {subItems.map((subItem) => (
            <li key={subItem.to}>
              <Link
                to={subItem.to}
                className="flex items-center gap-2 py-2 px-4 text-gray-800 hover:bg-gray-200 transition duration-200"
              >
                <span>{subItem.icon}</span>
                {subItem.label}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </li>
  );
};

export default SidebarItem;
