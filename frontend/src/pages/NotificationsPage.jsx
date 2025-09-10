import React, { useState } from "react";

/*
Usage:
This component renders a clean notifications page with search functionality and a table of notifications.  
It includes a child component for individual notifications, which displays the title, description, category, time, and status of each notification.
The notifications are filtered based on the search input, and if no notifications match, a message is displayed.
return <NotificationsPage />;
*/

// Child component for a single notification
function NotificationItem({ title, description, category, time, color, status }) {
  return (
    <tr className={`${status ? "bg-green-50" : "bg-gray-50"} hover:bg-gray-100 transition-colors`}>
      <td className="py-4 px-3 align-top rounded-l-lg">
        <div className="flex items-start">
          <span
            className="inline-block w-3 h-3 rounded-full mt-1 mr-3 flex-shrink-0"
            style={{ background: color }}
          ></span>
          <div className="flex-1 min-w-0">
            <span className="font-semibold text-gray-900 block">{title}</span>
            <span className="text-sm text-gray-600 mt-1 block">{description}</span>
          </div>
        </div>
      </td>
      <td className="py-4 px-3 align-top">
        <span className="text-sm text-gray-700">{category}</span>
      </td>
      <td className="py-4 px-3 align-top">
        <span className="text-sm text-gray-600">{time}</span>
      </td>
      <td className="py-4 px-3 align-top rounded-r-lg">
        <span
          className="inline-block w-12 h-6 rounded-full align-middle relative transition-colors"
          style={{ background: status ? "#10b981" : "#d1d5db" }}
        >
          <span 
            className={`absolute top-0.5 w-5 h-5 bg-white rounded-full shadow-sm transition-transform ${status ? 'transform translate-x-6' : 'transform translate-x-0.5'}`}
          ></span>
        </span>
      </td>
    </tr>
  );
}

// Parent component
const notifications = [
  {
    id: 1,
    title: "New Event Application",
    description: "You have received a new application for the Community Garden Project.",
    category: "Applications",
    time: "1 minute ago",
    color: "#2f6ce1",
    status: true,
  },
  {
    id: 2,
    title: "Event Approved",
    description: "Your River Cleanup Drive event has been approved and is now active.",
    category: "Events",
    time: "7 minutes ago",
    color: "#13C4A3",
    status: true,
  },
  {
    id: 3,
    title: "Volunteer Registered",
    description: "A new volunteer has registered for your upcoming event.",
    category: "Volunteers",
    time: "10 minutes ago",
    color: "#FFBA08",
    status: false,
  },
  {
    id: 4,
    title: "Event Deadline Reminder",
    description: "Your event registration deadline is approaching in 2 days.",
    category: "Reminders",
    time: "1 hour ago",
    color: "#EA5252",
    status: false,
  },
  {
    id: 5,
    title: "Impact Report Available",
    description: "Your monthly impact report is ready for download.",
    category: "Reports",
    time: "1 day ago",
    color: "#a0b0e2ff",
    status: true,
  },
];

export default function NotificationsPage() {
  const [search, setSearch] = useState("");

  // Filter notifications based on search input (case-insensitive)
  const filteredNotifications = notifications.filter((n) =>
    (n.title + " " + n.description + " " + n.category + " " + n.time)
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Main Content */}
        <div>
          <h1 className="text-xl lg:text-2xl font-bold text-gray-900 mb-2">Notifications</h1>
          <div className="text-gray-500 text-sm mb-8">
            Stay updated with the latest notifications
          </div>

          {/* Actions */}
          <div className="flex gap-3 mb-6">
            <input
              type="text"
              placeholder="Search notifications..."
              className="flex-1 py-2 px-3 rounded-lg border border-gray-300 text-sm outline-none focus:border-green-500 focus:ring-2 focus:ring-green-500 focus:ring-opacity-20 transition-colors"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            <button className="w-10 h-10 bg-gray-100 rounded-lg border border-gray-300 cursor-pointer flex items-center justify-center hover:bg-gray-200 transition-colors">
              {/* Simple filter icon using SVG */}
              <svg width="16" height="16" viewBox="0 0 20 20" fill="none">
                <path
                  d="M3 5h14M6 10h8M9 15h2"
                  stroke="#6b7280"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
              </svg>
            </button>
          </div>

          {/* Notifications Table */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100">
            <div className="p-6">
              <div className="w-full overflow-x-auto">
                <table className="w-full border-separate" style={{ borderSpacing: '0px 8px' }}>
              <thead>
                <tr>
                  <th className="text-sm font-semibold text-gray-600 text-left pb-2">Notification</th>
                  <th className="text-sm font-semibold text-gray-600 text-left pb-2">Category</th>
                  <th className="text-sm font-semibold text-gray-600 text-left pb-2">Time</th>
                  <th className="text-sm font-semibold text-gray-600 text-left pb-2">Status</th>
                </tr>
              </thead>
              <tbody>
                {filteredNotifications.length > 0 ? (
                  filteredNotifications.map((n) => (
                    <NotificationItem
                      key={n.id}
                      title={n.title}
                      description={n.description}
                      category={n.category}
                      time={n.time}
                      color={n.color}
                      status={n.status}
                    />
                  ))
                ) : (
                  <tr>
                    <td className="py-6 px-2 align-top text-center text-gray-500" colSpan={4}>
                      No notifications found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
