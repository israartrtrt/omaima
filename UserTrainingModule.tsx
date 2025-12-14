import { Play, Clock, TrendingUp, TrendingDown, AlertCircle, CheckCircle2, ShoppingCart, Package, Calculator, Users, BarChart3 } from 'lucide-react';
import { useState } from 'react';

interface ScenarioVideo {
  id: string;
  scenario: string;
  app: string;
  description: string;
  thumbnail: string;
  duration: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  icon: any;
  color: string;
}

const scenarioVideos: ScenarioVideo[] = [
  {
    id: '1',
    scenario: 'End-to-End Sales Order Processing',
    app: 'SALES',
    description: 'Complete workflow from quotation to delivery',
    thumbnail: 'https://images.unsplash.com/photo-1686061592689-312bbfb5c055?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzYWxlcyUyMGFuYWx5dGljcyUyMGRhc2hib2FyZHxlbnwxfHx8fDE3NjU3MDIyMDJ8MA&ixlib=rb-4.1.0&q=80&w=1080',
    duration: '28:45',
    difficulty: 'beginner',
    icon: BarChart3,
    color: 'bg-green-500',
  },
  {
    id: '2',
    scenario: 'Multi-Location Inventory Transfer',
    app: 'INVENTORY',
    description: 'Managing stock across multiple warehouses',
    thumbnail: 'https://images.unsplash.com/photo-1624927637280-f033784c1279?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxpbnZlbnRvcnklMjBtYW5hZ2VtZW50JTIwc29mdHdhcmV8ZW58MXx8fHwxNzY1NzAyMjAwfDA&ixlib=rb-4.1.0&q=80&w=1080',
    duration: '35:20',
    difficulty: 'intermediate',
    icon: Package,
    color: 'bg-blue-500',
  },
  {
    id: '3',
    scenario: 'Month-End Financial Close',
    app: 'ACCOUNTING',
    description: 'Complete accounting period close procedure',
    thumbnail: 'https://images.unsplash.com/photo-1753955900083-b62ee8d97805?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhY2NvdW50aW5nJTIwc29mdHdhcmUlMjBkYXNoYm9hcmR8ZW58MXx8fHwxNzY1NzAyMjAxfDA&ixlib=rb-4.1.0&q=80&w=1080',
    duration: '42:15',
    difficulty: 'advanced',
    icon: Calculator,
    color: 'bg-orange-500',
  },
  {
    id: '4',
    scenario: 'POS Daily Operations & Reconciliation',
    app: 'POS',
    description: 'Opening, transactions, and closing procedures',
    thumbnail: 'https://images.unsplash.com/photo-1556740738-b6a63e27c4df?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwb2ludCUyMG9mJTIwc2FsZSUyMHN5c3RlbXxlbnwxfHx8fDE3NjU3MDIyMDF8MA&ixlib=rb-4.1.0&q=80&w=1080',
    duration: '31:50',
    difficulty: 'beginner',
    icon: ShoppingCart,
    color: 'bg-purple-500',
  },
  {
    id: '5',
    scenario: 'Lead to Customer Conversion',
    app: 'CRM',
    description: 'Complete CRM pipeline from lead generation to won deal',
    thumbnail: 'https://images.unsplash.com/photo-1686061592689-312bbfb5c055?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzYWxlcyUyMGFuYWx5dGljcyUyMGRhc2hib2FyZHxlbnwxfHx8fDE3NjU3MDIyMDJ8MA&ixlib=rb-4.1.0&q=80&w=1080',
    duration: '26:30',
    difficulty: 'intermediate',
    icon: Users,
    color: 'bg-pink-500',
  },
  {
    id: '6',
    scenario: 'Purchase Order to Payment Flow',
    app: 'PURCHASE',
    description: 'Complete procurement cycle with vendor management',
    thumbnail: 'https://images.unsplash.com/photo-1624927637280-f033784c1279?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxpbnZlbnRvcnklMjBtYW5hZ2VtZW50JTIwc29mdHdhcmV8ZW58MXx8fHwxNzY1NzAyMjAwfDA&ixlib=rb-4.1.0&q=80&w=1080',
    duration: '38:10',
    difficulty: 'intermediate',
    icon: Package,
    color: 'bg-indigo-500',
  },
];

interface UATMetric {
  label: string;
  value: number;
  total: number;
  trend: 'up' | 'down' | 'neutral';
  status: 'good' | 'warning' | 'critical';
}

const uatMetrics: UATMetric[] = [
  { label: 'Test Cases Executed', value: 234, total: 312, trend: 'up', status: 'good' },
  { label: 'Defects Found', value: 18, total: 234, trend: 'down', status: 'good' },
  { label: 'Critical Issues', value: 3, total: 18, trend: 'neutral', status: 'warning' },
  { label: 'Test Coverage', value: 87, total: 100, trend: 'up', status: 'good' },
];

function VideoCard({ video }: { video: ScenarioVideo }) {
  const Icon = video.icon;
  
  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'beginner': return 'bg-green-100 text-green-700';
      case 'intermediate': return 'bg-yellow-100 text-yellow-700';
      case 'advanced': return 'bg-red-100 text-red-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
      {/* Thumbnail */}
      <div className="relative aspect-video bg-gray-200 overflow-hidden group cursor-pointer">
        <img 
          src={video.thumbnail} 
          alt={video.scenario}
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

        {/* Difficulty badge */}
        <div className="absolute top-2 right-2">
          <div className={`${getDifficultyColor(video.difficulty)} px-2 py-1 rounded text-xs capitalize shadow-md`}>
            {video.difficulty}
          </div>
        </div>
      </div>
      
      {/* Content */}
      <div className="p-4">
        <h3 className="font-semibold text-gray-900 mb-2">{video.scenario}</h3>
        <p className="text-sm text-gray-600 line-clamp-2">{video.description}</p>
        
        <button className="mt-4 w-full py-2 px-4 bg-[#0078D4] text-white rounded hover:bg-[#106EBE] transition-colors">
          Watch Scenario
        </button>
      </div>
    </div>
  );
}

export function UserTrainingModule() {
  const [selectedApp, setSelectedApp] = useState<string | null>(null);
  
  const apps = Array.from(new Set(scenarioVideos.map(v => v.app)));
  const filteredVideos = selectedApp 
    ? scenarioVideos.filter(v => v.app === selectedApp)
    : scenarioVideos;

  return (
    <div className="flex-1 bg-gray-50 p-6">
      {/* Header */}
      <div className="mb-6">
        <h2 className="text-2xl font-semibold text-gray-900 mb-2">User Training - Scenario-Based Learning</h2>
        <p className="text-gray-600">
          Real-world business scenarios demonstrating complete workflows
        </p>
      </div>

      {/* UAT Dashboard */}
      <div className="mb-6 bg-white rounded-lg shadow-md p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-900">UAT Progress Dashboard</h3>
          <span className="text-xs text-gray-500">Last updated: Dec 14, 2024</span>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {uatMetrics.map((metric, index) => {
            const percentage = Math.round((metric.value / metric.total) * 100);
            const getTrendIcon = () => {
              if (metric.trend === 'up') return <TrendingUp size={16} className="text-green-500" />;
              if (metric.trend === 'down') return <TrendingDown size={16} className="text-red-500" />;
              return null;
            };

            const getStatusIcon = () => {
              if (metric.status === 'good') return <CheckCircle2 size={20} className="text-green-500" />;
              if (metric.status === 'warning') return <AlertCircle size={20} className="text-yellow-500" />;
              return <AlertCircle size={20} className="text-red-500" />;
            };

            return (
              <div key={index} className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-lg p-4 border border-gray-200">
                <div className="flex items-start justify-between mb-2">
                  <div className="text-xs text-gray-600">{metric.label}</div>
                  {getStatusIcon()}
                </div>
                <div className="flex items-end gap-2 mb-2">
                  <div className="text-2xl font-semibold text-gray-900">{metric.value}</div>
                  <div className="text-sm text-gray-500 mb-0.5">/ {metric.total}</div>
                  {getTrendIcon()}
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className={`h-2 rounded-full transition-all ${
                      metric.status === 'good' ? 'bg-green-500' :
                      metric.status === 'warning' ? 'bg-yellow-500' : 'bg-red-500'
                    }`}
                    style={{ width: `${percentage}%` }}
                  />
                </div>
                <div className="text-xs text-gray-500 mt-1">{percentage}% complete</div>
              </div>
            );
          })}
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
          All Scenarios
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
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredVideos.map((video) => (
          <VideoCard key={video.id} video={video} />
        ))}
      </div>
    </div>
  );
}
