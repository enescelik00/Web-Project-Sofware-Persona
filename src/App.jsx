import { useState, useEffect } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import Layout from './Components/Layout'
import Home from './Pages/Home'
import Completed from './Pages/Completed'
import About from './Pages/About'

function App() {
  // 1. STATE: Görevler
  const [tasks, setTasks] = useState(() => {
    const saved = localStorage.getItem("myTasks");
    return saved ? JSON.parse(saved) : [];
  });

  // 2. STATE: Kategoriler
  const defaultCategories = [
    { name: "Genel", color: "bg-gray-100 text-gray-600 border-gray-200" },
    { name: "İş", color: "bg-blue-50 text-blue-600 border-blue-200" },
    { name: "Okul", color: "bg-orange-50 text-orange-600 border-orange-200" },
    { name: "Kişisel", color: "bg-green-50 text-green-600 border-green-200" }
  ];

  const [categories, setCategories] = useState(() => {
    const savedCats = localStorage.getItem("myCategories");
    return savedCats ? JSON.parse(savedCats) : defaultCategories;
  });

  // 3. STATE: Dark Mode 
  const [darkMode, setDarkMode] = useState(() => {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme) return savedTheme === "dark";
    return window.matchMedia("(prefers-color-scheme: dark)").matches;
  });

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem("theme", "light");
    }
  }, [darkMode]);

  const toggleTheme = () => setDarkMode(!darkMode);

  // LocalStorage Kayıtları
  useEffect(() => { localStorage.setItem("myTasks", JSON.stringify(tasks)); }, [tasks]);
  useEffect(() => { localStorage.setItem("myCategories", JSON.stringify(categories)); }, [categories]);

  
  // FONKSİYONLAR

  const addTask = (title, category, description) => {
    const newTask = { 
        id: Date.now(), 
        title, 
        category, 
        description, 
        isCompleted: false, 
        isPinned: false 
    };
    setTasks([newTask, ...tasks]);
    toast.success("Görev eklendi! 🚀");
  }

  const deleteTask = (id) => { setTasks(tasks.filter(t => t.id !== id)); toast.error("Görev silindi."); }
  
  const updateTask = (id, newTitle) => {
    setTasks(tasks.map(t => t.id === id ? { ...t, title: newTitle } : t));
    toast.info("Görev güncellendi.");
  }

  const toggleComplete = (id) => { setTasks(tasks.map(t => t.id === id ? { ...t, isCompleted: !t.isCompleted } : t)); }
  
  const togglePin = (id) => { setTasks(tasks.map(t => t.id === id ? { ...t, isPinned: !t.isPinned } : t)); }

  const clearCompleted = () => { setTasks(tasks.filter(t => !t.isCompleted)); toast.warn("Temizlendi."); }

  const addCategory = (name, color) => {
    if (categories.some(c => c.name === name)) {
        toast.error("Bu kategori zaten var!");
        return;
    }
    setCategories([...categories, { name, color }]);
    toast.success("Yeni kategori oluşturuldu!");
  }

  const deleteCategory = (categoryName) => {
    if (categoryName === "Genel") {
      toast.error("Genel kategorisi silinemez!");
      return;
    }
    setCategories(categories.filter(c => c.name !== categoryName));
    setTasks(tasks.map(t => t.category === categoryName ? { ...t, category: "Genel" } : t));
    toast.info(`"${categoryName}" silindi, görevler 'Genel'e taşındı.`);
  }

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout darkMode={darkMode} toggleTheme={toggleTheme} />}>
          <Route index element={
            <Home 
              tasks={tasks} 
              categories={categories} 
              onAdd={addTask} 
              onDelete={deleteTask} 
              onUpdate={updateTask} 
              onToggle={toggleComplete}
              onPin={togglePin}
              onAddCategory={addCategory}
              onDeleteCategory={deleteCategory}
            />
          } />
          <Route path="completed" element={
            <Completed 
              tasks={tasks}
              categories={categories}
              onDelete={deleteTask}
              onUpdate={updateTask}
              onToggle={toggleComplete}
              onPin={togglePin}
              onClearCompleted={clearCompleted}
            />
          } />
          <Route path="about" element={<About />} />
        </Route>
      </Routes>
      <ToastContainer position="bottom-right" autoClose={2000} theme={darkMode ? "dark" : "light"} />
    </BrowserRouter>
  )
}

export default App