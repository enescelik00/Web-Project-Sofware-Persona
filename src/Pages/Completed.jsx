import TaskItem from '../Components/TaskItem'
import { CheckCircle2, Trash2 } from 'lucide-react';

function Completed({ tasks, categories, onDelete, onUpdate, onToggle, onPin, onClearCompleted }) {
  const completedTasks = tasks.filter(t => t.isCompleted);

  // SIRALAMA: Yeniden eskiye
  const sortedCompleted = [...completedTasks].sort((a, b) => b.id - a.id);

  return (
    <div>
      <div className="flex justify-between items-end mb-8">
        <div>
            <h2 className="text-3xl font-bold text-gray-800 dark:text-gray-100 flex items-center gap-3">
            <CheckCircle2 className="text-green-600 dark:text-green-500" size={32} />
            Tamamlananlar
            </h2>
            <p className="text-gray-500 dark:text-gray-400 mt-2">Başardığın işlerin listesi.</p>
        </div>
        
        {completedTasks.length > 0 && (
            <button 
                onClick={onClearCompleted}
                className="text-red-500 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300 text-sm font-semibold flex items-center gap-1 px-3 py-2 rounded hover:bg-red-50 dark:hover:bg-red-900/20 transition"
            >
                <Trash2 size={16} /> Listeyi Temizle
            </button>
        )}
      </div>

      <div className="space-y-2">
        {sortedCompleted.length === 0 ? (
             <div className="text-center py-12 bg-white dark:bg-gray-800 rounded-xl border border-dashed border-gray-300 dark:border-gray-700 transition-colors">
                <p className="text-gray-400 dark:text-gray-500">Henüz tamamlanan bir görev yok.</p>
            </div>
        ) : (
            sortedCompleted.map(task => (
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

export default Completed