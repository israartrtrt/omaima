import { FolderOpen, GraduationCap, Users } from 'lucide-react';

interface SidebarProps {
  activeModule: string;
  onModuleChange: (module: string) => void;
}

export function Sidebar({ activeModule, onModuleChange }: SidebarProps) {
  const modules = [
    { id: 'project', label: 'Project', icon: FolderOpen },
    { id: 'learning', label: 'Learning', icon: GraduationCap },
    { id: 'user-training', label: 'User Training', icon: Users },
  ];

  return (
    <aside className="w-64 bg-[#F5F5F5] border-r border-gray-300 h-full">
      <nav className="p-4">
        <div className="space-y-2">
          {modules.map((module) => {
            const Icon = module.icon;
            const isActive = activeModule === module.id;
            
            return (
              <button
                key={module.id}
                onClick={() => onModuleChange(module.id)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
                  isActive
                    ? 'bg-[#0078D4] text-white shadow-md'
                    : 'text-gray-700 hover:bg-gray-200'
                }`}
              >
                <Icon size={20} />
                <span className="font-medium">{module.label}</span>
              </button>
            );
          })}
        </div>
      </nav>
      
      {/* Quick Links Section */}
      <div className="mt-8 px-4">
        <h3 className="text-xs uppercase tracking-wider text-gray-500 mb-3 px-4">Quick Links</h3>
        <div className="space-y-1">
          <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-200 rounded transition-colors">
            Recent Documents
          </a>
          <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-200 rounded transition-colors">
            Shared with Me
          </a>
          <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-200 rounded transition-colors">
            My Tasks
          </a>
        </div>
      </div>
    </aside>
  );
}
