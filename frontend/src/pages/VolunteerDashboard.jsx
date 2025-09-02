import React from 'react';
import StatCard from '../components/StatCard';
import OpportunityCard from '../components/OpportunityCard';
import RecentNotifications from '../components/RecentNotifications';
import UpcomingPickups from '../components/UpcomingPickups';
import { stats} from '../constants/DummyData';

export default function VolunteerDashboard() {
  return (
    <div className="flex min-h-screen bg-gray-100 font-sans">
     
      <div className="flex flex-col flex-1 overflow-y-auto">
       
        <main className="p-4 md:p-6 lg:p-8">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
                <div>
                    <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
                    <p className="mt-1 text-gray-600">Welcome, Volunteer!</p>
                </div>
                <div className="flex items-center space-x-2 mt-4 md:mt-0">
                    <button className="px-4 py-2 text-sm font-medium text-white bg-green-600 rounded-lg shadow-sm hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500">Volunteer View</button>
                    <button className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg shadow-sm hover:bg-gray-50">Admin View</button>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                {stats.map(stat => <StatCard key={stat.label} stat={stat} />)}
            </div>

            <div>
                    <OpportunityCard/>
      
            </div>
            
            <div className="mt-8 grid grid-cols-1 lg:grid-cols-2 gap-8">
                <UpcomingPickups />
                <RecentNotifications />
            </div>
        </main>
      </div>
    </div>
  );
}
