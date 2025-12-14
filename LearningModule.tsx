import { Play, Clock, CheckCircle, ShoppingCart, Package, Calculator, Users, BarChart3, Boxes, FileText, Truck } from 'lucide-react';
import { useState } from 'react';

interface OdooAppVideo {
  id: string;
  app: string;
  title: string;
  description: string;
  thumbnail: string;
  duration: string;
  completed: boolean;
  icon: any;
  color: string;
}

const odooAppVideos: OdooAppVideo[] = [
  {
    id: '1',
    app: 'POS',
    title: 'Point of Sale - Complete Guide',
    description: 'Master the Odoo POS interface for retail transactions',
    thumbnail: 'https://images.unsplash.com/photo-1556740738-b6a63e27c4df?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwb2ludCUyMG9mJTIwc2FsZSUyMHN5c3RlbXxlbnwxfHx8fDE3NjU3MDIyMDF8MA&ixlib=rb-4.1.0&q=80&w=1080',
    duration: '42:15',
    completed: true,
    icon: ShoppingCart,
    color: 'bg-purple-500',
  },
  {
    id: '2',
    app: 'SALES',
    title: 'Sales Management Workflow',
    description: 'Learn quotations, orders, and sales pipeline management',
    thumbnail: 'https://images.unsplash.com/photo-1686061592689-312bbfb5c055?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzYWxlcyUyMGFuYWx5dGljcyUyMGRhc2hib2FyZHxlbnwxfHx8fDE3NjU3MDIyMDJ8MA&ixlib=rb-4.1.0&q=80&w=1080',
    duration: '38:45',
    completed: true,
    icon: BarChart3,
    color: 'bg-green-500',
  },
  {
    id: '3',
    app: 'INVENTORY',
    title: 'Inventory & Warehouse Management',
    description: 'Stock control, transfers, and inventory operations',
    thumbnail: 'https://images.unsplash.com/photo-1624927637280-f033784c1279?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxpbnZlbnRvcnklMjBtYW5hZ2VtZW50JTIwc29mdHdhcmV8ZW58MXx8fHwxNzY1NzAyMjAwfDA&ixlib=rb-4.1.0&q=80&w=1080',
    duration: '51:30',
    completed: false,
    icon: Package,
    color: 'bg-blue-500',
  },
  {
    id: '4',
    app: 'ACCOUNTING',
    title: 'Financial Accounting Setup',
    description: 'Chart of accounts, journals, and financial reporting',
    thumbnail: 'https://images.unsplash.com/photo-1753955900083-b62ee8d97805?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhY2NvdW50aW5nJTIwc29mdHdhcmUlMjBkYXNoYm9hcmR8ZW58MXx8fHwxNzY1NzAyMjAxfDA&ixlib=rb-4.1.0&q=80&w=1080',
    duration: '56:20',
    completed: false,
    icon: Calculator,
    color: 'bg-orange-500',
  },
  {
    id: '5',
    app: 'CRM',
    title: 'Customer Relationship Management',
    description: 'Leads, opportunities, and customer pipeline',
    thumbnail: 'https://images.unsplash.com/photo-1686061592689-312bbfb5c055?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzYWxlcyUyMGFuYWx5dGljcyUyMGRhc2hib2FyZHxlbnwxfHx8fDE3NjU3MDIyMDJ8MA&ixlib=rb-4.1.0&q=80&w=1080',
    duration: '44:10',
    completed: false,
    icon: Users,
    color: 'bg-pink-500',
  },
  {
    id: '6',
    app: 'PURCHASE',
    title: 'Purchase & Procurement',
    description: 'RFQs, purchase orders, and vendor management',
    thumbnail: 'https://images.unsplash.com/photo-1624927637280-f033784c1279?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxpbnZlbnRvcnklMjBtYW5hZ2VtZW50JTIwc29mdHdhcmV8ZW58MXx8fHwxNzY1NzAyMjAwfDA&ixlib=rb-4.1.0&q=80&w=1080',
    duration: '39:55',
    completed: false,
    icon: Truck,
    color: 'bg-indigo-500',
  },
  {
    id: '7',
    app: 'MANUFACTURING',
    title: 'Manufacturing Operations',
    description: 'BOMs, work orders, and production management',
    thumbnail: 'https://images.unsplash.com/photo-1624927637280-f033784c1279?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxpbnZlbnRvcnklMjBtYW5hZ2VtZW50JTIwc29mdHdhcmV8ZW58MXx8fHwxNzY1NzAyMjAwfDA&ixlib=rb-4.1.0&q=80&w=1080',
    duration: '48:25',
    completed: false,
    icon: Boxes,
    color: 'bg-teal-500',
  },
  {
    id: '8',
    app: 'INVOICING',
    title: 'Invoicing & Billing',
    description: 'Create invoices, track payments, and manage billing',
    thumbnail: 'https://images.unsplash.com/photo-1753955900083-b62ee8d97805?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhY2NvdW50aW5nJTIwc29mdHdhcmUlMjBkYXNoYm9hcmR8ZW58MXx8fHwxNzY1NzAyMjAxfDA&ixlib=rb-4.1.0&q=80&w=1080',
    duration: '35:40',
    completed: false,
    icon: FileText,
    color: 'bg-yellow-500',
  },
];

function VideoCard({ video }: { video: OdooAppVideo }) {
  const Icon = video.icon;
  
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
      {/* Thumbnail */}
      <div className="relative aspect-video bg-gray-200 overflow-hidden group cursor-pointer">
        <img 
          src={video.thumbnail} 
          alt={video.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
        
        {/* Play button overlay */}
        <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
          <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center">
            <Play size={24} className="text-[#0078D4] ml-1" fill="currentColor" />
          </div>
        </div>
        
        {/* Duration badge */}
        <div className="absolute bottom-2 right-2 bg-black/80 text-white px-2 py-1 rounded text-xs flex items-center gap-1">
          <Clock size={12} />
          {video.duration}
        </div>
        
        {/* App badge */}
        <div className="absolute top-2 left-2">
          <div className={`${video.color} text-white px-3 py-1 rounded-full text-xs flex items-center gap-1.5 shadow-md`}>
            <Icon size={14} />
            {video.app}
          </div>
        </div>

        {/* Completed badge */}
        {video.completed && (
          <div className="absolute top-2 right-2">
            <div className="bg-green-500 text-white p-1.5 rounded-full shadow-md">
              <CheckCircle size={16} />
            </div>
          </div>
        )}
      </div>
      
      {/* Content */}
      <div className="p-4">
        <h3 className="font-semibold text-gray-900 mb-2">{video.title}</h3>
        <p className="text-sm text-gray-600 line-clamp-2">{video.description}</p>
        
        <button className={`mt-4 w-full py-2 px-4 rounded transition-colors ${
          video.completed
            ? 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            : 'bg-[#0078D4] text-white hover:bg-[#106EBE]'
        }`}>
          {video.completed ? 'Watch Again' : 'Start Learning'}
        </button>
      </div>
    </div>
  );
}

export function LearningModule() {
  const [selectedApp, setSelectedApp] = useState<string | null>(null);
  
  const apps = Array.from(new Set(odooAppVideos.map(v => v.app)));
  const filteredVideos = selectedApp 
    ? odooAppVideos.filter(v => v.app === selectedApp)
    : odooAppVideos;

  const completedCount = odooAppVideos.filter(v => v.completed).length;
  const totalCount = odooAppVideos.length;
  const progressPercentage = Math.round((completedCount / totalCount) * 100);

  return (
    <div className="flex-1 bg-gray-50 p-6">
      {/* Header */}
      <div className="mb-6">
        <h2 className="text-2xl font-semibold text-gray-900 mb-2">Odoo Screen Recordings</h2>
        <p className="text-gray-600">
          Comprehensive screen recordings for each Odoo application module
        </p>
      </div>

      {/* Progress Overview */}
      <div className="mb-6 bg-white rounded-lg shadow-md p-6">
        <div className="flex items-center justify-between mb-3">
          <div>
            <h3 className="font-semibold text-gray-900">Learning Progress</h3>
            <p className="text-sm text-gray-600">
              {completedCount} of {totalCount} modules completed
            </p>
          </div>
          <div className="text-right">
            <div className="text-2xl font-semibold text-[#0078D4]">{progressPercentage}%</div>
          </div>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-3">
          <div
            className="bg-[#0078D4] h-3 rounded-full transition-all"
            style={{ width: `${progressPercentage}%` }}
          />
        </div>
      </div>

      {/* Filter/App tabs */}
      <div className="mb-6 flex items-center gap-2 overflow-x-auto pb-2">
        <button 
          onClick={() => setSelectedApp(null)}
          className={`px-4 py-2 rounded-lg whitespace-nowrap transition-colors ${
            selectedApp === null 
              ? 'bg-[#0078D4] text-white' 
              : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-200'
          }`}
        >
          All Apps
        </button>
        {apps.map((app) => (
          <button 
            key={app}
            onClick={() => setSelectedApp(app)}
            className={`px-4 py-2 rounded-lg whitespace-nowrap transition-colors ${
              selectedApp === app 
                ? 'bg-[#0078D4] text-white' 
                : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-200'
            }`}
          >
            {app}
          </button>
        ))}
      </div>

      {/* Video Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filteredVideos.map((video) => (
          <VideoCard key={video.id} video={video} />
        ))}
      </div>
    </div>
  );
}
