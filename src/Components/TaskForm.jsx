import { useState, useRef, useEffect } from 'react'
import { Plus, Tag, X, AlignLeft } from 'lucide-react';

function TaskForm({ onAdd, categories, onAddCategory, onDeleteCategory }) {
  const [text, setText] = useState("")
  const [description, setDescription] = useState("")
  const [category, setCategory] = useState(categories[0]?.name || "Genel")
  
  const [isAddingCat, setIsAddingCat] = useState(false);
  const [newCatName, setNewCatName] = useState("");
  
  const catInputRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (catInputRef.current && !catInputRef.current.contains(event.target)) {
        setIsAddingCat(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [catInputRef]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (text.trim() === "") return;
    onAdd(text, category, description);
    setText("");
    setDescription("");
  }

  const handleNewCategory = () => {
    if (newCatName.trim() === "") return;
    
    const colors = [
        "bg-red-100 text-red-700 border-red-300", "bg-orange-100 text-orange-700 border-orange-300",
        "bg-amber-100 text-amber-700 border-amber-300", "bg-yellow-100 text-yellow-700 border-yellow-300",
        "bg-lime-100 text-lime-700 border-lime-300", "bg-green-100 text-green-700 border-green-300",
        "bg-emerald-100 text-emerald-700 border-emerald-300", "bg-teal-100 text-teal-700 border-teal-300",
        "bg-cyan-100 text-cyan-700 border-cyan-300", "bg-sky-100 text-sky-700 border-sky-300",
        "bg-blue-100 text-blue-700 border-blue-300", "bg-indigo-100 text-indigo-700 border-indigo-300",
        "bg-violet-100 text-violet-700 border-violet-300", "bg-purple-100 text-purple-700 border-purple-300",
        "bg-fuchsia-100 text-fuchsia-700 border-fuchsia-300", "bg-pink-100 text-pink-700 border-pink-300",
        "bg-rose-100 text-rose-700 border-rose-300"
    ];
    
    const randomColor = colors[Math.floor(Math.random() * colors.length)];
    
    onAddCategory(newCatName, randomColor);
    setNewCatName("");
    setIsAddingCat(false);
  }

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') { e.preventDefault(); handleNewCategory(); }
  }

  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-100 dark:border-gray-700 shadow-sm mb-8 transition-all hover:shadow-md overflow-hidden">
      
      <form onSubmit={handleSubmit} className="p-5 pb-2">
        <div className="flex gap-4">
            <div className="flex-1 space-y-2">
                <input 
                  type="text" 
                  placeholder="Ne yapman gerekiyor?" 
                  className="w-full text-lg font-medium text-gray-800 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500 outline-none bg-transparent"
                  value={text}
                  onChange={(e) => setText(e.target.value)}
                  autoFocus
                />
                
                <div className="flex items-start gap-2">
                    <AlignLeft size={16} className="text-gray-400 dark:text-gray-500 mt-1" />
                    <textarea 
                        placeholder="Açıklama veya not ekle (İsteğe bağlı)" 
                        className="w-full text-sm text-gray-600 dark:text-gray-300 placeholder-gray-400 dark:placeholder-gray-500 outline-none bg-transparent resize-none h-auto min-h-[24px]"
                        rows="1"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                    />
                </div>
            </div>

            <button 
              type="submit"
              disabled={text.trim() === ""}
              className="bg-indigo-600 hover:bg-indigo-700 disabled:bg-gray-200 dark:disabled:bg-gray-700 disabled:text-gray-400 dark:disabled:text-gray-500 disabled:cursor-not-allowed text-white p-3 rounded-xl transition-all shadow-sm h-fit"
            >
              <Plus size={24} />
            </button>
        </div>
      </form>

      <div className="h-px bg-gray-50 dark:bg-gray-700 mx-5 my-2"></div>

      <div className="bg-white dark:bg-gray-800 px-5 py-3 flex items-center gap-2 overflow-x-auto scrollbar-hide">
        <Tag size={14} className="text-gray-400 dark:text-gray-500 mr-2 flex-shrink-0" />
        
        {categories.map((cat) => (
            <div key={cat.name} className="relative group flex-shrink-0">
                <button
                    type="button"
                    onClick={() => setCategory(cat.name)}
                    className={`text-xs font-medium px-3 py-1.5 rounded-lg border transition-all whitespace-nowrap ${
                        category === cat.name 
                        ? cat.color + " ring-1 ring-offset-1 ring-gray-200 dark:ring-gray-600 font-bold dark:ring-offset-gray-800" 
                        : "bg-white dark:bg-gray-800 text-gray-500 dark:text-gray-400 border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700"
                    }`}
                >
                    {cat.name}
                </button>
                
                {cat.name !== "Genel" && (
                    <button 
                        onClick={(e) => { e.stopPropagation(); onDeleteCategory(cat.name); }}
                        className="absolute -top-2 -right-1 bg-red-500 text-white rounded-full p-0.5 opacity-0 group-hover:opacity-100 transition-all shadow-sm hover:scale-110"
                        title="Sil"
                    >
                        <X size={10} />
                    </button>
                )}
            </div>
        ))}

        <div className="border-l border-gray-200 dark:border-gray-700 pl-2 ml-1" ref={catInputRef}>
            {isAddingCat ? (
                <div className="flex items-center gap-1 bg-white dark:bg-gray-700 border dark:border-gray-600 rounded-lg p-1 shadow-sm animate-in fade-in slide-in-from-left-2">
                    <input 
                        type="text" 
                        placeholder="Ad..." 
                        className="text-xs px-2 py-1 outline-none w-20 bg-transparent text-gray-700 dark:text-gray-200 placeholder-gray-400"
                        value={newCatName}
                        onChange={(e) => setNewCatName(e.target.value)}
                        onKeyDown={handleKeyDown} 
                        autoFocus
                    />
                    <button onClick={handleNewCategory} className="text-green-600 hover:bg-green-50 dark:hover:bg-green-900/30 p-1 rounded"><Plus size={14}/></button>
                    <button onClick={() => setIsAddingCat(false)} className="text-red-500 hover:bg-red-50 dark:hover:bg-red-900/30 p-1 rounded"><X size={14}/></button>
                </div>
            ) : (
                <button 
                    onClick={() => setIsAddingCat(true)}
                    className="text-xs font-medium px-3 py-1.5 rounded-lg border border-dashed border-gray-300 dark:border-gray-600 text-gray-400 dark:text-gray-500 hover:text-indigo-600 dark:hover:text-indigo-400 hover:border-indigo-300 dark:hover:border-indigo-500 hover:bg-indigo-50 dark:hover:bg-indigo-900/20 transition-all whitespace-nowrap"
                >
                    + Yeni
                </button>
            )}
        </div>
      </div>
    </div>
  )
}

export default TaskForm