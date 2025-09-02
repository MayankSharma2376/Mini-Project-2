import React from 'react';
import Icon from '../constants/Icons';
import { pickups } from '../constants/DummyData';
// Component to display upcoming waste pickups
const UpcomingPickups = () => (
    <div className="bg-white p-6 rounded-xl shadow-md">
        <h3 className="text-lg font-semibold text-gray-800 mb-1">Upcoming Pickups</h3>
        <p className="text-sm text-gray-500 mb-4">Your scheduled waste collections.</p>
        <div className="space-y-4">
            {pickups.map(pickup => (
                <div key={pickup.date} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div>
                        <p className="font-medium text-gray-800">{pickup.date}</p>
                        <p className="text-sm text-gray-500">{pickup.type}</p>
                    </div>
                    <span className="text-xs font-bold text-yellow-600 bg-yellow-100 px-3 py-1 rounded-full">{pickup.status}</span>
                </div>
            ))}
        </div>
        <button className="mt-6 w-full py-2 text-sm font-semibold text-green-600 border border-green-600 rounded-lg hover:bg-green-50">View All Pickups</button>
    </div>
);
export default UpcomingPickups;