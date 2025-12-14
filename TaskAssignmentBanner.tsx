import { useState } from 'react';
import { Users, Send, X, AlertCircle, CheckCircle2 } from 'lucide-react';

interface Task {
  id: string;
  title: string;
  assignedTo: string;
  priority: 'low' | 'medium' | 'high';
  createdBy: string;
  createdAt: Date;
}

const teamMembers = [
  'John Smith',
  'Sarah Johnson',
  'Michael Chen',
  'Emma Williams',
  'David Brown',
  'Lisa Anderson',
];

export function TaskAssignmentBanner() {
  const [isExpanded, setIsExpanded] = useState(false);
  const [taskTitle, setTaskTitle] = useState('');
  const [selectedMember, setSelectedMember] = useState('');
  const [priority, setPriority] = useState<'low' | 'medium' | 'high'>('medium');
  const [recentTasks, setRecentTasks] = useState<Task[]>([
    {
      id: '1',
      title: 'Review Lamoda UAT documents',
      assignedTo: 'Sarah Johnson',
      priority: 'high',
      createdBy: 'John Smith',
      createdAt: new Date(2024, 11, 14, 9, 30),
    },
    {
      id: '2',
      title: 'Update inventory records for Dana project',
      assignedTo: 'Michael Chen',
      priority: 'medium',
      createdBy: 'John Smith',
      createdAt: new Date(2024, 11, 14, 8, 15),
    },
  ]);

  const handleAssignTask = () => {
    if (!taskTitle.trim() || !selectedMember) return;

    const newTask: Task = {
      id: Date.now().toString(),
      title: taskTitle,
      assignedTo: selectedMember,
      priority,
      createdBy: 'John Smith', // Current user
      createdAt: new Date(),
    };

    setRecentTasks([newTask, ...recentTasks]);
    setTaskTitle('');
    setSelectedMember('');
    setPriority('medium');
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high':
        return 'bg-red-100 text-red-700 border-red-300';
      case 'medium':
        return 'bg-yellow-100 text-yellow-700 border-yellow-300';
      case 'low':
        return 'bg-green-100 text-green-700 border-green-300';
      default:
        return 'bg-gray-100 text-gray-700 border-gray-300';
    }
  };

  const removeTask = (taskId: string) => {
    setRecentTasks(recentTasks.filter(task => task.id !== taskId));
  };

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      {/* Header */}
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full px-6 py-4 flex items-center justify-between bg-gradient-to-r from-[#0078D4] to-[#106EBE] text-white hover:from-[#106EBE] hover:to-[#0078D4] transition-all"
      >
        <div className="flex items-center gap-3">
          <Users size={20} />
          <div className="text-left">
            <h3 className="font-semibold">Task Assignment Portal</h3>
            <p className="text-xs text-white/80">Assign tasks to team members - visible to all</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-xs bg-white/20 px-2 py-1 rounded">{recentTasks.length} active tasks</span>
          <div className={`transform transition-transform ${isExpanded ? 'rotate-180' : ''}`}>
            ▼
          </div>
        </div>
      </button>

      {/* Expanded Content */}
      {isExpanded && (
        <div className="p-6">
          {/* Task Creation Form */}
          <div className="bg-gray-50 rounded-lg p-4 mb-6">
            <h4 className="font-semibold text-gray-900 mb-4">Create New Task Assignment</h4>
            
            <div className="space-y-4">
              {/* Task Title */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Task Description
                </label>
                <input
                  type="text"
                  value={taskTitle}
                  onChange={(e) => setTaskTitle(e.target.value)}
                  placeholder="Enter task description..."
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0078D4] focus:border-transparent"
                />
              </div>

              {/* Assignee Selection */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Assign To
                  </label>
                  <select
                    value={selectedMember}
                    onChange={(e) => setSelectedMember(e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0078D4] focus:border-transparent"
                  >
                    <option value="">Select team member...</option>
                    {teamMembers.map((member) => (
                      <option key={member} value={member}>
                        {member}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Priority Selection */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Priority
                  </label>
                  <div className="flex gap-2">
                    <button
                      onClick={() => setPriority('low')}
                      className={`flex-1 py-2 px-3 rounded-lg border transition-colors ${
                        priority === 'low'
                          ? 'bg-green-100 text-green-700 border-green-300'
                          : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'
                      }`}
                    >
                      Low
                    </button>
                    <button
                      onClick={() => setPriority('medium')}
                      className={`flex-1 py-2 px-3 rounded-lg border transition-colors ${
                        priority === 'medium'
                          ? 'bg-yellow-100 text-yellow-700 border-yellow-300'
                          : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'
                      }`}
                    >
                      Medium
                    </button>
                    <button
                      onClick={() => setPriority('high')}
                      className={`flex-1 py-2 px-3 rounded-lg border transition-colors ${
                        priority === 'high'
                          ? 'bg-red-100 text-red-700 border-red-300'
                          : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'
                      }`}
                    >
                      High
                    </button>
                  </div>
                </div>
              </div>

              {/* Submit Button */}
              <button
                onClick={handleAssignTask}
                disabled={!taskTitle.trim() || !selectedMember}
                className="w-full bg-[#0078D4] text-white py-3 px-6 rounded-lg hover:bg-[#106EBE] disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors flex items-center justify-center gap-2"
              >
                <Send size={18} />
                Assign Task to Team
              </button>
            </div>
          </div>

          {/* Recent Tasks Display */}
          <div>
            <div className="flex items-center justify-between mb-4">
              <h4 className="font-semibold text-gray-900">Active Task Assignments</h4>
              <div className="text-xs text-gray-500 flex items-center gap-1">
                <AlertCircle size={14} />
                Visible to all team members
              </div>
            </div>

            {recentTasks.length === 0 ? (
              <div className="text-center py-8 text-gray-500">
                <Users size={32} className="mx-auto mb-2 opacity-50" />
                <p className="text-sm">No active task assignments</p>
              </div>
            ) : (
              <div className="space-y-3">
                {recentTasks.map((task) => (
                  <div
                    key={task.id}
                    className="bg-white border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow"
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <CheckCircle2 size={16} className="text-green-500" />
                          <h5 className="font-medium text-gray-900">{task.title}</h5>
                        </div>
                        <div className="flex items-center gap-4 text-xs text-gray-600">
                          <span className="flex items-center gap-1">
                            <Users size={12} />
                            Assigned to: <span className="font-medium">{task.assignedTo}</span>
                          </span>
                          <span>
                            By: {task.createdBy}
                          </span>
                          <span>
                            {task.createdAt.toLocaleDateString('en-US', { 
                              month: 'short', 
                              day: 'numeric',
                              hour: '2-digit',
                              minute: '2-digit'
                            })}
                          </span>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className={`text-xs px-2 py-1 rounded border ${getPriorityColor(task.priority)}`}>
                          {task.priority.toUpperCase()}
                        </span>
                        <button
                          onClick={() => removeTask(task.id)}
                          className="p-1 hover:bg-red-50 rounded text-red-600 transition-colors"
                          aria-label="Remove task"
                        >
                          <X size={16} />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
