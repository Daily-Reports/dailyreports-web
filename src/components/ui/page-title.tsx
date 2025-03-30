import React from "react";

type PageTitleProps = {
    title: string;
    subtitle?: string;
};

const PageTitle: React.FC<PageTitleProps> = ({ title, subtitle}) => {
    return (
        <div>
            <div className="text-3xl font-bold">{title}</div>
            {subtitle && <div className="text-xl text-gray-600">{subtitle}</div>}
        </div>
    );
};

export default PageTitle;