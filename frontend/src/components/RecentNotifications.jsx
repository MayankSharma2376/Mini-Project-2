import React from "react";
import Icon from "../constants/Icons";
import { notifications } from "../constants/DummyData";

const RecentNotifications = () => (
    <div className="bg-white p-6 rounded-xl shadow-md">
        <h3 className="text-lg font-semibold text-gray-800 mb-1">Recent Notifications</h3>
        <p className="text-sm text-gray-500 mb-4">Important updates and reminders.</p>
        <div className="space-y-2">
            {notifications.map(note => (
                <a href="#" key={note.text} className="flex items-center justify-between p-3 hover:bg-gray-50 rounded-lg">
                    <div className="flex items-center">
                        <div className={`flex-shrink-0 h-8 w-8 rounded-full bg-${note.color}-100 flex items-center justify-center`}>
                            <Icon name={note.icon} className={`h-5 w-5 text-${note.color}-600`} />
                        </div>
                        <div className="ml-3">
                            <p className="text-sm text-gray-800">{note.text}</p>
                            <p className="text-xs text-gray-500">{note.time}</p>
                        </div>
                    </div>
                    <Icon name="ChevronRight" className="h-5 w-5 text-gray-400" />
                </a>
            ))}
        </div>
        <button className="mt-6 w-full py-2 text-sm font-semibold text-green-600 border border-green-600 rounded-lg hover:bg-green-50">View All Notifications</button>
    </div>
);
export default RecentNotifications;