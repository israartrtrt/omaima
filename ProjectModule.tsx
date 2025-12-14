import { useState } from 'react';
import { 
  Folder, 
  File, 
  FileText, 
  ChevronRight, 
  ChevronDown,
  CheckSquare,
  Grid,
  List,
  Download,
  Share2,
  MoreVertical
} from 'lucide-react';

interface FileItem {
  id: string;
  name: string;
  type: 'folder' | 'file' | 'task';
  children?: FileItem[];
  size?: string;
  modified?: string;
}

const projectStructure: FileItem[] = [
  {
    id: 'standard-docs',
    name: 'Standard Project Documents',
    type: 'folder',
    children: [
      { id: 'uat', name: 'UAT', type: 'folder' },
      { id: 'cbr', name: 'CBR', type: 'folder' },
      { id: 'to-be', name: 'TO-BE', type: 'folder' },
      { id: 'as-is', name: 'AS-IS', type: 'folder' },
      { id: 'playbook', name: 'PLAYBOOK', type: 'folder' },
      { id: 'kickoff', name: 'KICK-OFF PRESENTATION', type: 'file', size: '2.4 MB', modified: '2024-12-10' },
      { id: 'fac', name: 'FAC', type: 'folder' },
      { id: 'sdlc', name: 'SDLC', type: 'folder' },
    ],
  },
  {
    id: 'lamoda',
    name: 'Lamoda',
    type: 'folder',
    children: [
      { id: 'task-171', name: 'Task 171', type: 'task', modified: '2024-12-12' },
      { id: 'task-156', name: 'Task 156', type: 'task', modified: '2024-12-11' },
      { id: 'contracts', name: 'contracts', type: 'file', size: '1.8 MB', modified: '2024-12-13' },
      { id: 'products', name: 'products', type: 'file', size: '856 KB', modified: '2024-12-13' },
      { id: 'inventories', name: 'inventories', type: 'file', size: '1.2 MB', modified: '2024-12-12' },
      { id: 'as-is-client', name: 'as-is file submitted by client', type: 'file', size: '3.1 MB', modified: '2024-12-10' },
    ],
  },
  {
    id: 'dana',
    name: 'Dana',
    type: 'folder',
    children: [],
  },
  {
    id: 'al-qama',
    name: 'AL Qama',
    type: 'folder',
    children: [],
  },
];

function FileTreeItem({ item, level = 0 }: { item: FileItem; level?: number }) {
  const [isExpanded, setIsExpanded] = useState(false);
  const hasChildren = item.children && item.children.length > 0;

  const getIcon = () => {
    if (item.type === 'folder') return <Folder size={18} className="text-blue-600" />;
    if (item.type === 'task') return <CheckSquare size={18} className="text-green-600" />;
    return <FileText size={18} className="text-gray-600" />;
  };

  return (
    <div>
      <div
        className="flex items-center gap-2 px-3 py-2 hover:bg-gray-100 rounded cursor-pointer group"
        style={{ paddingLeft: `${level * 24 + 12}px` }}
        onClick={() => hasChildren && setIsExpanded(!isExpanded)}
      >
        {hasChildren ? (
          isExpanded ? (
            <ChevronDown size={16} className="text-gray-500" />
          ) : (
            <ChevronRight size={16} className="text-gray-500" />
          )
        ) : (
          <span className="w-4" />
        )}
        
        {getIcon()}
        
        <span className="flex-1 text-sm">{item.name}</span>
        
        {item.size && <span className="text-xs text-gray-500">{item.size}</span>}
        {item.modified && <span className="text-xs text-gray-500">{item.modified}</span>}
        
        <div className="opacity-0 group-hover:opacity-100 flex items-center gap-1">
          <button className="p-1 hover:bg-gray-200 rounded">
            <Share2 size={14} className="text-gray-600" />
          </button>
          <button className="p-1 hover:bg-gray-200 rounded">
            <Download size={14} className="text-gray-600" />
          </button>
          <button className="p-1 hover:bg-gray-200 rounded">
            <MoreVertical size={14} className="text-gray-600" />
          </button>
        </div>
      </div>
      
      {isExpanded && hasChildren && (
        <div>
          {item.children!.map((child) => (
            <FileTreeItem key={child.id} item={child} level={level + 1} />
          ))}
        </div>
      )}
    </div>
  );
}

export function ProjectModule() {
  const [viewMode, setViewMode] = useState<'list' | 'grid'>('list');

  return (
    <div className="flex-1 bg-white">
      {/* Toolbar */}
      <div className="border-b border-gray-200 bg-gray-50 px-6 py-3 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <h2 className="font-semibold text-gray-800">Project Documents</h2>
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <span>All Projects</span>
            <ChevronRight size={16} />
            <span>Documents</span>
          </div>
        </div>
        
        <div className="flex items-center gap-2">
          <button
            onClick={() => setViewMode('list')}
            className={`p-2 rounded ${viewMode === 'list' ? 'bg-gray-200' : 'hover:bg-gray-200'}`}
          >
            <List size={18} />
          </button>
          <button
            onClick={() => setViewMode('grid')}
            className={`p-2 rounded ${viewMode === 'grid' ? 'bg-gray-200' : 'hover:bg-gray-200'}`}
          >
            <Grid size={18} />
          </button>
        </div>
      </div>

      {/* Column Headers */}
      <div className="border-b border-gray-200 bg-gray-50 px-6 py-2 flex items-center gap-4 text-xs uppercase tracking-wider text-gray-600">
        <span className="w-4"></span>
        <span className="w-4"></span>
        <span className="flex-1">Name</span>
        <span className="w-24">Size</span>
        <span className="w-32">Modified</span>
        <span className="w-24"></span>
      </div>

      {/* File Tree */}
      <div className="px-3 py-2">
        {projectStructure.map((item) => (
          <FileTreeItem key={item.id} item={item} />
        ))}
      </div>
    </div>
  );
}
