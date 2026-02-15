import { CheckCircle, LayoutDashboard, Menu, Moon, Sun } from "lucide-react";
import { Link, Outlet, useLocation } from "react-router-dom";

function Layout({ darkMode, toggleTheme }) {
  const location = useLocation();

  const menuItems = [
    { path: "/", label: "Görevlerim", icon: <LayoutDashboard size={20} /> },
    { path: "/completed", label: "Tamamlananlar", icon: <CheckCircle size={20} /> },
    { path: "/about", label: "Hakkında", icon: <Menu size={20} /> },
  ];

  return (
    <div className="flex h-screen bg-gray-50 dark:bg-gray-900 text-gray-800 dark:text-gray-100 font-sans transition-colors duration-300">
      
      {/* Sidebar */}
      <aside className="w-64 bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 hidden md:flex flex-col transition-colors duration-300">
        <div className="p-6 border-b border-gray-100 dark:border-gray-700">
          <h1 className="text-2xl font-bold text-indigo-600 dark:text-indigo-400 flex items-center gap-2">
            <CheckCircle className="fill-indigo-600 text-white dark:text-gray-800" />
            TaskMate
          </h1>
        </div>

        <nav className="flex-1 p-4 space-y-2">
          {menuItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 ${
                location.pathname === item.path
                  ? "bg-indigo-50 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-300 font-semibold shadow-sm"
                  : "text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 hover:text-gray-900 dark:hover:text-gray-200"
              }`}
            >
              {item.icon}
              {item.label}
            </Link>
          ))}
        </nav>
        
        <div className="p-4 text-xs text-center text-gray-400 dark:text-gray-600">
            v1.2.1 - Layout Optimized
        </div>
      </aside>

      {/* Ana İçerik */}
      <main className="flex-1 flex flex-col overflow-hidden">
        
        
        <header className="flex justify-end items-center px-8 pt-6 pb-0 bg-transparent">
             <div 
                className={`w-14 h-8 flex items-center rounded-full p-1 cursor-pointer transition-colors duration-300 ${
                    darkMode ? 'bg-indigo-600' : 'bg-gray-300'
                }`}
                onClick={toggleTheme}
             >
                <div 
                    className={`bg-white w-6 h-6 rounded-full shadow-md transform transition-transform duration-300 flex items-center justify-center ${
                        darkMode ? 'translate-x-6' : 'translate-x-0'
                    }`}
                >
                    {darkMode ? (
                        <Moon size={14} className="text-indigo-600" />
                    ) : (
                        <Sun size={14} className="text-yellow-500" />
                    )}
                </div>
             </div>
        </header>

        
        <div className="flex-1 overflow-auto px-8 pb-8 pt-2">
            <div className="max-w-5xl mx-auto">
                <Outlet /> 
            </div>
        </div>
      </main>
    </div>
  );
}

export default Layout;