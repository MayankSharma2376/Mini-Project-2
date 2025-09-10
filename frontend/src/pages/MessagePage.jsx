import React, { useState, useEffect, useRef } from "react";
import { Send, Search, MessageSquare } from 'lucide-react';
import io from 'socket.io-client';
import { messageAPI } from '../services/api'; // 👈 Import the new API service

// Helper function to truncate the last message
const truncateMessage = (message = "", wordLimit = 11) => {
    const words = message.split(" ");
    if (words.length > wordLimit) {
        return words.slice(0, wordLimit).join(" ") + "...";
    }
    return message;
};

export default function MessagePage() {
  const [currentUser, setCurrentUser] = useState(null);
  const [allUsers, setAllUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMsg, setNewMsg] = useState("");
  const [search, setSearch] = useState("");
  const [socket, setSocket] = useState(null);
  const [unreadCounts, setUnreadCounts] = useState({});
  
  const messagesEndRef = useRef(null);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user") || "null");
    if (user) {
      setCurrentUser(user);
    }
  }, []);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);
  
  useEffect(() => {
    if (search.trim() === "") {
        setFilteredUsers(allUsers);
    } else {
        setFilteredUsers(
            allUsers.filter(user => 
                user.name.toLowerCase().includes(search.toLowerCase())
            )
        );
    }
  }, [search, allUsers]);

  useEffect(() => {
    if (currentUser) {
      const newSocket = io("http://localhost:4000", {
        query: { userId: currentUser._id },
      });
      setSocket(newSocket);

      newSocket.on("newMessage", (newMessage) => {
        if (selectedUser?._id === newMessage.senderId) {
            setMessages((prevMessages) => [...prevMessages, newMessage]);
        } else {
            setUnreadCounts(prev => ({
                ...prev,
                [newMessage.senderId]: (prev[newMessage.senderId] || 0) + 1,
            }));
            const updateUserList = (list) => list.map(u => 
                u._id === newMessage.senderId 
                ? { ...u, lastMessage: { message: newMessage.message, createdAt: newMessage.createdAt } } 
                : u
            );
            setAllUsers(prevUsers => updateUserList(prevUsers));
        }
      });

      return () => newSocket.close();
    }
  }, [currentUser, selectedUser]);

  useEffect(() => {
    if (!currentUser) return;
    
    const getUsers = async () => {
      try {
        // 👇 Use the imported API service
        const users = await messageAPI.fetchAllUsers();
        const filtered = users.filter(u => u._id !== currentUser._id);
        setAllUsers(filtered);
        
        const initialUnread = {};
        filtered.forEach(u => {
            if (u.unreadCount > 0) {
                initialUnread[u._id] = u.unreadCount;
            }
        });
        setUnreadCounts(initialUnread);

      } catch (err) {
        console.error("Error fetching users:", err);
      }
    };
    getUsers();
  }, [currentUser]);

  useEffect(() => {
    if (!selectedUser?._id || !currentUser?._id) return;
    
    const getMessages = async () => {
      try {
        // 👇 Use the imported API service
        const data = await messageAPI.fetchMessages(selectedUser._id);
        setMessages(data);
      } catch (err) {
        console.error("Error loading messages:", err);
      }
    };
    getMessages();
  }, [selectedUser, currentUser]);

  const sendMessage = async (e) => {
    e.preventDefault();
    if (!newMsg.trim() || !selectedUser?._id) return;

    try {
      // 👇 Use the imported API service
      const sentMessage = await messageAPI.postMessage(selectedUser._id, newMsg);
      setMessages((prev) => [...prev, sentMessage]);
      const updateUserList = (list) => list.map(u => 
          u._id === selectedUser._id 
          ? { ...u, lastMessage: { message: newMsg, createdAt: Date.now() } } 
          : u
      );
      setAllUsers(prevUsers => updateUserList(prevUsers));
      setNewMsg("");
    } catch (err) {
      console.error("Error sending message:", err);
    }
  };

  const handleUserSelect = (user) => {
      setSelectedUser(user);
      if (unreadCounts[user._id]) {
          setUnreadCounts(prev => {
              const newCounts = { ...prev };
              delete newCounts[user._id];
              return newCounts;
          });
      }
  };

  return (
    // JSX remains unchanged...
    <main className="bg-white font-sans flex flex-col h-[calc(100vh-4rem)]">
        <div className="p-6 border-b border-slate-200">
            <h1 className="text-2xl font-bold text-slate-800">Messages</h1>
            <p className="text-sm text-slate-500">Chat with volunteers, NGOs, and waste management parties</p>
        </div>
        <div className="flex-grow flex overflow-hidden">
            {/* Left Sidebar */}
            <div className="w-1/3 max-w-sm border-r border-slate-200 flex flex-col bg-slate-50/50">
                <div className="p-4 border-b border-slate-200">
                    <div className="relative">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                        <input
                            type="text"
                            placeholder="Search users..."
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            className="w-full p-2 pl-10 border border-slate-300 rounded-full bg-white focus:ring-2 focus:ring-teal-500 focus:outline-none transition-shadow"
                        />
                    </div>
                </div>
                <div className="flex-1 overflow-y-auto">
                    {filteredUsers.map((user) => (
                      <div
                        key={user._id}
                        className={`flex items-center p-3 cursor-pointer hover:bg-slate-100 border-b border-slate-200 transition-colors ${selectedUser?._id === user._id ? 'bg-teal-50' : ''}`}
                        onClick={() => handleUserSelect(user)}
                      >
                          <div className="w-11 h-11 rounded-full bg-teal-100 text-teal-600 flex items-center justify-center mr-3 flex-shrink-0 font-semibold text-lg">
                            {user.name.charAt(0).toUpperCase()}
                          </div>
                          <div className="flex-1 overflow-hidden">
                              <h3 className={`font-semibold truncate ${selectedUser?._id === user._id ? 'text-teal-700' : 'text-slate-800'}`}>
                                {user.name}
                              </h3>
                              <p className="text-sm text-slate-500 truncate">
                                {user.lastMessage 
                                    ? truncateMessage(user.lastMessage.message) 
                                    : "Start a conversation"
                                }
                              </p>
                          </div>
                          {unreadCounts[user._id] && (
                            <div className="ml-2 w-2.5 h-2.5 bg-teal-500 rounded-full flex-shrink-0" title={`${unreadCounts[user._id]} unread message(s)`}></div>
                          )}
                      </div>
                    ))}
                </div>
            </div>

            {/* Right Chat Window */}
            <div className="flex-1 flex flex-col bg-white">
                {selectedUser ? (
                    <>
                        <div className="flex items-center p-3 border-b border-slate-200 bg-white shadow-sm">
                            <div className="w-10 h-10 rounded-full bg-teal-100 text-teal-600 flex items-center justify-center mr-3 font-semibold text-lg">
                              {selectedUser.name.charAt(0).toUpperCase()}
                            </div>
                            <h3 className="font-semibold text-slate-900 text-lg">{selectedUser.name}</h3>
                        </div>
                        <div className="flex-1 p-6 overflow-y-auto bg-slate-50">
                            {messages.map((m) => (
                                <div key={m._id} className={`flex mb-4 ${m.senderId === currentUser._id ? "justify-end" : "justify-start"}`}>
                                    <div className={`max-w-lg p-3 rounded-xl shadow-sm ${m.senderId === currentUser._id ? 'bg-teal-500 text-white' : 'bg-white text-slate-800 border border-slate-200'}`}>
                                        <p className="text-sm">{m.message}</p>
                                        <span className={`text-xs mt-1.5 block text-right ${m.senderId === currentUser._id ? 'text-teal-100' : 'text-slate-400'}`}>
                                            {new Date(m.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                        </span>
                                    </div>
                                </div>
                            ))}
                            <div ref={messagesEndRef} />
                        </div>
                        <div className="p-4 border-t border-slate-200 bg-white">
                            <form onSubmit={sendMessage} className="flex items-center space-x-3">
                                <input
                                    type="text"
                                    placeholder="Type a message..."
                                    value={newMsg}
                                    onChange={(e) => setNewMsg(e.target.value)}
                                    className="flex-1 w-full px-4 py-2 bg-white border border-slate-300 rounded-full focus:outline-none focus:ring-2 focus:ring-teal-500"
                                />
                                <button type="submit" className="bg-teal-500 text-white p-2.5 rounded-full hover:bg-teal-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500 disabled:opacity-50 transition-colors" disabled={!newMsg.trim()}>
                                    <Send size={20} />
                                </button>
                            </form>
                        </div>
                    </>
                ) : (
                    <div className="flex flex-col items-center justify-center h-full text-slate-500 text-center p-4 bg-slate-50">
                        <MessageSquare size={48} className="mb-4 text-slate-300" />
                        <h3 className="text-lg font-semibold">Select a conversation</h3>
                        <p className="text-sm">Choose a user from the left to start messaging.</p>
                    </div>
                )}
            </div>
        </div>
    </main>
  );
}