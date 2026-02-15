import { useState } from 'react';
import TaskForm from '../Components/TaskForm';
import TaskItem from '../Components/TaskItem';
import { ClipboardList } from 'lucide-react';

function Home({ tasks, categories, onAdd, onDelete, onUpdate, onToggle, onPin, onAddCategory, onDeleteCategory }) {
  
  const [activeTab, setActiveTab] = useState("Tümü");

  // FİLTRELEME
  const filteredTasks = tasks.filter(t => {
    const categoryMatch = activeTab === "Tümü" ? true : t.category === activeTab;
    return !t.isCompleted && categoryMatch;
  });

  // SIRALAMA
  const sortedTasks = [...filteredTasks].sort((a, b) => {
    if (a.isPinned && !b.isPinned) return -1;
    if (!a.isPinned && b.isPinned) return 1;
    return b.id - a.id;
  });

  return (
    <div>
      <div className="mb-6">
        <h2 className="text-3xl font-bold text-gray-800 dark:text-gray-100 flex items-center gap-3">
          <ClipboardList className="text-indigo-600 dark:text-indigo-400" size={32} />
          Görevlerim
        </h2>
        
        {/* Sekmeler */}
        <div className="flex gap-2 mt-8 mb-2 overflow-x-auto p-1 scrollbar-hide">
            <button 
                onClick={() => setActiveTab("Tümü")}
                className={`px-4 py-2 rounded-full text-sm font-semibold transition-all whitespace-nowrap border ${
                    activeTab === "Tümü" 
                    ? "bg-indigo-600 text-white border-indigo-600 shadow-md ring-2 ring-indigo-200 dark:ring-indigo-900 ring-offset-1 dark:ring-offset-gray-900" 
                    : "bg-white dark:bg-gray-800 text-gray-500 dark:text-gray-400 border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700"
                }`}
            >
                Tümü
            </button>
            
            {categories.map(cat => (
                <button 
                    key={cat.name}
                    onClick={() => setActiveTab(cat.name)}
                    className={`px-4 py-2 rounded-full text-sm font-semibold transition-all whitespace-nowrap border ${
                        activeTab === cat.name 
                        ? cat.color + " ring-2 ring-offset-1 ring-gray-200 dark:ring-gray-700 shadow-md font-bold dark:ring-offset-gray-900" 
                        : "bg-white dark:bg-gray-800 text-gray-500 dark:text-gray-400 border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700"
                    }`}
                >
                    {cat.name}
                </button>
            ))}
        </div>
      </div>
      
      <TaskForm 
        onAdd={onAdd} 
        categories={categories} 
        onAddCategory={onAddCategory} 
        onDeleteCategory={onDeleteCategory} 
      />

      <div className="space-y-3 mt-6">
        {sortedTasks.length === 0 ? (
            <div className="text-center py-12 bg-white dark:bg-gray-800 rounded-xl border-2 border-dashed border-gray-200 dark:border-gray-700 transition-colors">
                <p className="text-gray-500 dark:text-gray-400 font-medium">
                    {activeTab === "Tümü" ? "Harika! Hiç işin yok." : `"${activeTab}" kategorisinde görev yok.`}
                </p>
                <p className="text-sm text-gray-400 dark:text-gray-500">Keyfine bak veya yeni bir şeyler ekle.</p>
            </div>
        ) : (
            sortedTasks.map(task => (
                <TaskItem 
                    key={task.id} 
                    task={task} 
                    categories={categories}
                    onDelete={onDelete}
                    onUpdate={onUpdate}
                    onToggle={onToggle}
                    onPin={onPin}
                />
            ))
        )}
      </div>
    </div>
  )
}

export default Home