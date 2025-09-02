import React from 'react';
import Icon from '../constants/Icons';
// Reusable StatCard component to display individual statistics
const StatCard = ({ stat }) => (
    <div className="bg-white p-6 rounded-xl shadow-md flex items-center justify-between">
        <div>
            <p className="text-sm text-gray-500">{stat.label}</p>
            <p className="text-3xl font-bold text-gray-900">{stat.value}</p>
            <p className="text-sm text-gray-500">{stat.period}</p>
        </div>
        <div className='p-4 bg-[#c3f7dc] rounded-lg'>
        <Icon name={stat.icon} className="h-8 w-8 text-[#09a66b]" />
        </div>
    </div>
);
export default StatCard;