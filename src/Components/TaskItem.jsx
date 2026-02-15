import { useState } from 'react'
import { Trash2, Edit, Check, X, Save, Pin } from 'lucide-react';

function TaskItem({ task, onDelete, onUpdate, onToggle, onPin, categories }) {
  const [isEditing, setIsEditing] = useState(false)
  const [newTitle, setNewTitle] = useState(task.title)
  const [isExiting, setIsExiting] = useState(false);

  const categoryObj = categories?.find(c => c.name === task.category);
  const categoryColorClass = categoryObj ? categoryObj.color : "bg-gray-100 text-gray-500 border-gray-200";
  
  const showPin = task.isPinned && !task.isCompleted;

  const handleSave = () => {
    if (newTitle.trim() === "") return;
    onUpdate(task.id, newTitle);
    setIsEditing(false);
  }

  const handleCheckboxClick = () => {
    setIsExiting(true);
    setTimeout(() => {
        onToggle(task.id);
        if (task.isCompleted) setIsExiting(false);
    }, 500); 
  }

  if (isEditing) {
    return (
      <div className="flex gap-2 items-center bg-indigo-50 dark:bg-indigo-900/30 p-3 mb-3 rounded-lg border-2 border-indigo-200 dark:border-indigo-700">
        <input 
          type="text" 
          className="flex-1 bg-transparent border-none outline-none text-indigo-900 dark:text-indigo-100 font-medium px-2"
          value={newTitle}
          onChange={(e) => setNewTitle(e.target.value)}
          autoFocus
        />
        <button onClick={handleSave} className="text-green-600 hover:bg-green-100 dark:hover:bg-green-900/30 p-2 rounded"><Save size={18} /></button>
        <button onClick={() => setIsEditing(false)} className="text-gray-500 hover:bg-gray-200 dark:hover:bg-gray-700 p-2 rounded"><X size={18} /></button>
      </div>
    )
  }

  return (
    <div 
        className={`group relative flex justify-between items-start p-4 rounded-xl border transition-all duration-500 ease-in-out ${
            isExiting 
            ? "opacity-0 translate-y-10 mb-0 py-0 h-0 overflow-hidden border-none" 
            : "opacity-100 mb-3 hover:shadow-md"
        } ${
            task.isCompleted 
            ? "bg-gray-50 dark:bg-gray-800/50 border-gray-100 dark:border-gray-700 opacity-60" 
            : "bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 hover:border-indigo-300 dark:hover:border-indigo-500"
        } ${
            showPin ? "border-l-4 border-l-indigo-500 bg-indigo-50/30 dark:bg-indigo-900/20" : ""
        }`}
    >
      
      <div className="flex items-start gap-4 flex-1 overflow-hidden">
        {/* CHECKBOX */}
        <button 
            onClick={handleCheckboxClick}
            className={`flex-shrink-0 w-6 h-6 mt-1 rounded border-2 flex items-center justify-center transition-all duration-300 ${
                task.isCompleted || isExiting
                ? "bg-indigo-600 border-indigo-600 scale-90" 
                : "border-gray-300 dark:border-gray-600 hover:border-indigo-500 dark:hover:border-indigo-400 bg-white dark:bg-gray-700"
            }`}
        >
            {(task.isCompleted || isExiting) && <Check size={14} className="text-white" strokeWidth={3} />}
        </button>

        <div className="flex flex-col items-start w-full min-w-0">
            {/* ÜST SATIR: Kategori ve Pin */}
            <div className='flex justify-between w-full pr-4 items-center'>
                <span className={`text-[10px] uppercase font-bold tracking-wider mb-1 px-2 py-0.5 rounded border ${categoryColorClass}`}>
                    {task.category || "GENEL"}
                </span>
                {showPin && <Pin size={14} className="text-indigo-500 fill-indigo-500 rotate-45 ml-2" />}
            </div>
            
            {/* BAŞLIK */}
            <span className={`text-lg font-medium transition-all break-words w-full ${
                task.isCompleted || isExiting 
                ? "text-gray-400 dark:text-gray-500 line-through decoration-2 decoration-gray-300 dark:decoration-gray-600" 
                : "text-gray-700 dark:text-gray-200"
            }`}>
                {task.title}
            </span>

            {/* AÇIKLAMA */}
            {task.description && (
                <p className={`text-sm mt-1 line-clamp-2 font-normal ${
                    task.isCompleted ? "text-gray-300 dark:text-gray-600" : "text-gray-500 dark:text-gray-400"
                }`}>
                    {task.description}
                </p>
            )}
        </div>
      </div>

      {/* BUTONLAR */}
      <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity ml-2 pt-1">
        {!task.isCompleted && (
            <>
            <button 
                onClick={() => onPin(task.id)}
                className={`p-2 rounded-lg transition ${task.isPinned ? "text-indigo-600 bg-indigo-50 dark:bg-indigo-900/30 dark:text-indigo-400" : "text-gray-400 hover:text-indigo-600 hover:bg-gray-50 dark:hover:bg-gray-700"}`}
                title={task.isPinned ? "Pini Kaldır" : "Pinle"}
            >
                <Pin size={18} className={task.isPinned ? "fill-indigo-600 rotate-45" : ""} />
            </button>

            <button 
                onClick={() => setIsEditing(true)}
                className="text-gray-400 hover:text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/20 dark:hover:text-blue-400 p-2 rounded-lg transition"
                title="Düzenle"
            >
                <Edit size={18} />
            </button>
            </>
        )}
        
        <button 
          onClick={() => onDelete(task.id)}
          className="text-gray-400 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 dark:hover:text-red-400 p-2 rounded-lg transition"
          title="Sil"
        >
          <Trash2 size={18} />
        </button>
      </div>
    </div>
  )
}

export default TaskItem