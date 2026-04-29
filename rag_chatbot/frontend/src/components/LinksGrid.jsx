import React from 'react';
import { importantLinks } from '../config/links';

const LinksGrid = ({ onLinkClick }) => {
  return (
    <section id="important-links" className="py-20 bg-secondary/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Explore Your Opportunities
          </h2>
          <div className="w-24 h-1 bg-primary mx-auto rounded-full"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {importantLinks.map((link, index) => {
            const Icon = link.icon;

            if (link.title === 'Contact Us') {
              return (
                <a 
                  key={index} 
                  href="https://www.cuchd.in/contact/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group bg-card rounded-2xl p-8 border border-border hover:shadow-xl hover:border-primary/50 transition-all duration-300 transform hover:-translate-y-2 flex flex-col items-center text-center w-full"
                >
                  <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-6 group-hover:bg-primary/20 transition-colors">
                    <Icon className="w-8 h-8 text-primary" />
                  </div>
                  <h3 className="text-xl font-bold text-card-foreground mb-3">{link.title}</h3>
                  <p className="text-muted-foreground">{link.description}</p>
                </a>
              );
            }

            return (
              <button 
                key={index} 
                onClick={() => onLinkClick && onLinkClick(link.title)}
                className="group bg-card rounded-2xl p-8 border border-border hover:shadow-xl hover:border-primary/50 transition-all duration-300 transform hover:-translate-y-2 flex flex-col items-center text-center w-full"
              >
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-6 group-hover:bg-primary/20 transition-colors">
                  <Icon className="w-8 h-8 text-primary" />
                </div>
                <h3 className="text-xl font-bold text-card-foreground mb-3">{link.title}</h3>
                <p className="text-muted-foreground">{link.description}</p>
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default LinksGrid;
