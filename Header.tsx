import { Logo } from './Logo';
import { Search, Bell, Settings, User, LogOut, UserCircle, HelpCircle, ChevronDown } from 'lucide-react';
import { useState } from 'react';

export function Header() {
  const [showNotifications, setShowNotifications] = useState(false);
  const [showProfile, setShowProfile] = useState(false);

  const notifications = [
    { id: '1', type: 'task', message: 'New task assigned: Review Lamoda contracts', time: '5 min ago', unread: true },
    { id: '2', type: 'deadline', message: 'Document submission deadline approaching', time: '1 hour ago', unread: true },
    { id: '3', type: 'comment', message: 'Sarah commented on UAT review document', time: '2 hours ago', unread: false },
    { id: '4', type: 'update', message: 'Dana project status updated', time: '3 hours ago', unread: false },
  ];

  const unreadCount = notifications.filter(n => n.unread).length;

  return (
    <header className="bg-[#0078D4] text-white shadow-md sticky top-0 z-50">
      <div className="flex items-center justify-between px-6 py-3">
        {/* Logo Section */}
        <div className="flex items-center gap-6">
          <Logo />
        </div>

        {/* Search Bar */}
        <div className="flex-1 max-w-2xl mx-8">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
            <input
              type="text"
              placeholder="Search documents, projects, training materials..."
              className="w-full pl-10 pr-4 py-2 rounded bg-white/10 border border-white/20 text-white placeholder-white/60 focus:outline-none focus:bg-white/20 focus:border-white/40 transition-colors"
            />
          </div>
        </div>

        {/* User Actions */}
        <div className="flex items-center gap-4">
          {/* Notifications Dropdown */}
          <div className="relative">
            <button 
              onClick={() => {
                setShowNotifications(!showNotifications);
                setShowProfile(false);
              }}
              className="p-2 hover:bg-white/10 rounded transition-colors relative"
            >
              <Bell size={20} />
              {unreadCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {unreadCount}
                </span>
              )}
            </button>
            
            {showNotifications && (
              <div className="absolute right-0 mt-2 w-80 bg-white rounded-lg shadow-xl border border-gray-200 overflow-hidden">
                <div className="bg-gray-50 px-4 py-3 border-b border-gray-200">
                  <h3 className="font-semibold text-gray-900">Notifications</h3>
                </div>
                <div className="max-h-96 overflow-y-auto">
                  {notifications.map((notif) => (
                    <div 
                      key={notif.id}
                      className={`px-4 py-3 border-b border-gray-100 hover:bg-gray-50 cursor-pointer transition-colors ${
                        notif.unread ? 'bg-blue-50/50' : ''
                      }`}
                    >
                      <div className="flex items-start gap-3">
                        {notif.unread && (
                          <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0" />
                        )}
                        <div className="flex-1 min-w-0">
                          <p className="text-sm text-gray-900">{notif.message}</p>
                          <p className="text-xs text-gray-500 mt-1">{notif.time}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="px-4 py-3 bg-gray-50 text-center">
                  <button className="text-sm text-[#0078D4] hover:underline">View all notifications</button>
                </div>
              </div>
            )}
          </div>

          <button className="p-2 hover:bg-white/10 rounded transition-colors">
            <Settings size={20} />
          </button>

          {/* Profile Dropdown */}
          <div className="relative">
            <button 
              onClick={() => {
                setShowProfile(!showProfile);
                setShowNotifications(false);
              }}
              className="flex items-center gap-2 p-2 hover:bg-white/10 rounded transition-colors"
            >
              <User size={20} />
              <span className="text-sm">John Smith</span>
              <ChevronDown size={16} />
            </button>
            
            {showProfile && (
              <div className="absolute right-0 mt-2 w-64 bg-white rounded-lg shadow-xl border border-gray-200 overflow-hidden">
                <div className="bg-gradient-to-br from-blue-50 to-blue-100 px-4 py-4 border-b border-gray-200">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-[#0078D4] rounded-full flex items-center justify-center text-white">
                      <User size={24} />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900">John Smith</h3>
                      <p className="text-xs text-gray-600">Project Manager</p>
                    </div>
                  </div>
                </div>
                <div className="py-2">
                  <button className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-100 transition-colors flex items-center gap-3">
                    <UserCircle size={16} />
                    My Profile
                  </button>
                  <button className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-100 transition-colors flex items-center gap-3">
                    <Settings size={16} />
                    Account Settings
                  </button>
                  <button className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-100 transition-colors flex items-center gap-3">
                    <HelpCircle size={16} />
                    Help & Support
                  </button>
                  <div className="border-t border-gray-200 my-2" />
                  <button className="w-full px-4 py-2 text-left text-sm text-red-600 hover:bg-red-50 transition-colors flex items-center gap-3">
                    <LogOut size={16} />
                    Sign Out
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}