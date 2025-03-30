import React from 'react';

const NotFoundRoute: React.FC = () => {
    return (
        <div className="h-[100vh] bg-[#f9f9f9] text-black flex flex-col justify-center items-center p-6">
            <h1 className="text-4xl font-bold text-gray-700">404</h1>
            <p className="text-lg text-gray-500 mt-2">Página não encontrada</p>
        </div>
    );
};

export default NotFoundRoute;