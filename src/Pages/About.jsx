import { Code2, Github, Linkedin, Mail } from 'lucide-react';

function About() {
  return (
    <div className="max-w-2xl mx-auto">
       <h2 className="text-3xl font-bold text-gray-800 dark:text-gray-100 mb-6 flex items-center gap-3">
          <Code2 className="text-indigo-600 dark:text-indigo-400" size={32} />
          Proje Hakkında
       </h2>
       
       <div className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 transition-colors">
            <p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-6">
                Bu uygulama, bir staj projesi olarak tasarlanmış olup, modern frontend geliştirme standartlarını 
                sergilemek amacıyla inşa edilmiştir. Sadece bir liste aracı değil; kullanıcı deneyimi (UX) odaklı geçiş efektleri, 
                dinamik kategori yönetimi ve akıllı sıralama algoritmaları içeren kapsamlı bir SPA (Single Page Application) örneğidir.
            </p>

            <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-100 mb-4">Geliştirici İletişim</h3>
            <div className="space-y-3">
                <a href="#" className="flex items-center gap-3 text-gray-600 dark:text-gray-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition p-2 hover:bg-gray-50 dark:hover:bg-gray-700 rounded-lg">
                    <Github size={20} /> github.com/enescelik00
                </a>
                <a href="#" className="flex items-center gap-3 text-gray-600 dark:text-gray-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition p-2 hover:bg-gray-50 dark:hover:bg-gray-700 rounded-lg">
                    <Linkedin size={20} /> linkedin.com/in/enescelik0
                </a>
                <a href="#" className="flex items-center gap-3 text-gray-600 dark:text-gray-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition p-2 hover:bg-gray-50 dark:hover:bg-gray-700 rounded-lg">
                    <Mail size={20} /> enes.celik3033@gmail.com
                </a>
            </div>
       </div>
    </div>
  )
}

export default About