import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import LinksGrid from '../components/LinksGrid';
import Footer from '../components/Footer';
import ChatbotButton from '../components/Chatbot/ChatbotButton';
import ChatWindow from '../components/Chatbot/ChatWindow';

const Home = () => {
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [initialPrompt, setInitialPrompt] = useState("");

  const toggleChat = () => {
    setIsChatOpen(!isChatOpen);
  };

  const handleExploreAction = () => {
    setIsChatOpen(true);
    setInitialPrompt("What courses are offered at Chandigarh University?");
  };

  const handlePromptHandled = () => {
    setInitialPrompt("");
  };

  const handleLinkClick = (title) => {
    setIsChatOpen(true);
    setInitialPrompt(`Tell me more about ${title} at Chandigarh University.`);
  };

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col">
      <Navbar />
      <main className="flex-grow">
        <Hero onExplore={handleExploreAction} />
        <LinksGrid onLinkClick={handleLinkClick} />
      </main>
      <Footer />
      
      {/* Floating Chatbot */}
      <ChatbotButton isOpen={isChatOpen} toggleChat={toggleChat} />
      <ChatWindow 
        isOpen={isChatOpen} 
        initialPrompt={initialPrompt}
        onPromptHandled={handlePromptHandled}
      />
    </div>
  );
};

export default Home;
