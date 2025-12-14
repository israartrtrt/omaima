import { useState } from 'react';
import { Header } from './components/Header';
import { Sidebar } from './components/Sidebar';
import { ProjectModule } from './components/ProjectModule';
import { LearningModule } from './components/LearningModule';
import { UserTrainingModule } from './components/UserTrainingModule';
import DualTimeClock from './components/DualTimeClock';
import { TaskAssignmentBanner } from './components/TaskAssignmentBanner';

export default function App() {
  const [activeModule, setActiveModule] = useState('project');

  const renderModule = () => {
    switch (activeModule) {
      case 'project':
        return <ProjectModule />;
      case 'learning':
        return <LearningModule />;
      case 'user-training':
        return <UserTrainingModule />;
      default:
        return <ProjectModule />;
    }
  };

  return (
    <div className="h-screen flex flex-col bg-gray-100">
      <Header />
      
      <div className="flex-1 flex overflow-hidden">
        {/* Sidebar */}
        <Sidebar activeModule={activeModule} onModuleChange={setActiveModule} />
        
        {/* Main Content Area */}
        <div className="flex-1 flex overflow-hidden">
          {/* Module Content */}
          <div className="flex-1 overflow-auto">
            {renderModule()}
          </div>
          
          {/* Right Sidebar - Calendar Widget and Task Banner */}
          <div className="w-80 bg-gray-50 border-l border-gray-300 overflow-auto p-4 space-y-4 hidden xl:block">
            <DualTimeClock />
            <TaskAssignmentBanner />
          </div>
        </div>
      </div>
    </div>
  );
}