// File: src/components/Admin/StatsCard.jsx

import React from 'react';

const StatsCard = ({ icon, title, value, change, changeType }) => {
    const changeColor = changeType === 'increase' ? 'text-green-500' : 'text-red-500';

    return (
        <div className="bg-white p-6 rounded-xl shadow-md border border-gray-200/80 flex items-start justify-between">
            <div>
                <p className="text-sm font-medium text-gray-500">{title}</p>
                <p className="text-3xl font-bold text-gray-800 mt-1">{value}</p>
                {change && (
                    <p className={`text-xs mt-2 ${changeColor}`}>
                        {change}
                    </p>
                )}
            </div>
            <div className="bg-blue-100 text-blue-600 p-3 rounded-full">
                {icon}
            </div>
        </div>
    );
};

export default StatsCard;