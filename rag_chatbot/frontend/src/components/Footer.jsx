import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-card py-12 border-t border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-6 md:mb-0 text-center md:text-left">
            <span className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-blue-400 block mb-2">
              Chandigarh University
            </span>
            <p className="text-muted-foreground">© {new Date().getFullYear()} Chandigarh University. All rights reserved.</p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
