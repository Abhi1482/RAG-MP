import React, { useState, useEffect } from 'react';
import { Moon, Sun } from 'lucide-react';

const Navbar = () => {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    // Check initial preference
    if (document.documentElement.classList.contains('dark')) {
      setIsDark(true);
    }
  }, []);

  const toggleTheme = () => {
    setIsDark(!isDark);
    if (!isDark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  };

  return (
    <nav className="fixed w-full z-50 bg-background/80 backdrop-blur-md border-b border-border/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex-shrink-0 flex items-center">
            <img 
              src="https://www.cuchd.in/includes/assets/images/header-footer/cu-logo-dark-new.webp" 
              alt="Chandigarh University Logo" 
              className="h-10 w-auto object-contain dark:brightness-200 dark:contrast-200 dark:grayscale" 
            />
          </div>
          <div className="hidden md:flex space-x-8">
            <a href="https://cuchd.in" target="_blank" rel="noopener noreferrer" className="text-foreground/80 hover:text-primary transition-colors">cuchd.in</a>
            <a href="https://uims.cuchd.in" target="_blank" rel="noopener noreferrer" className="text-foreground/80 hover:text-primary transition-colors">students.cuchd.in</a>
            <a href="https://cuchd.blackboard.com" target="_blank" rel="noopener noreferrer" className="text-foreground/80 hover:text-primary transition-colors">lms.cuchd.in</a>
          </div>
          <div className="flex items-center">
            <button
              onClick={toggleTheme}
              className="p-2 rounded-full hover:bg-secondary transition-colors"
              aria-label="Toggle Dark Mode"
            >
              {isDark ? <Sun className="w-5 h-5 text-yellow-500" /> : <Moon className="w-5 h-5 text-slate-700" />}
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
