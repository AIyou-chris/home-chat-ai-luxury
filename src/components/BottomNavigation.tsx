
import { Button } from '@/components/ui/button';
import { Home, Image, Info, Phone, MessageSquare, MessageCircle, Shield } from 'lucide-react';

interface BottomNavigationProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
  onChatOpen: () => void;
}

const tabs = [
  { id: 'home', label: 'Home', icon: Home },
  { id: 'gallery', label: 'Gallery', icon: Image },
  { id: 'details', label: 'Details', icon: Info },
  { id: 'contact', label: 'Contact', icon: Phone },
  { id: 'agent', label: 'Agent', icon: Shield },
];

export const BottomNavigation = ({ activeTab, onTabChange, onChatOpen }: BottomNavigationProps) => {
  const handleTabClick = (tabId: string) => {
    if (tabId === 'agent') {
      window.location.href = '/agent-dashboard';
    } else {
      onTabChange(tabId);
    }
  };

  return (
    <>
      {/* Desktop Navigation */}
      <div className="hidden md:block fixed top-4 right-4 z-40">
        <div className="flex items-center space-x-2">
          <a
            href="/realtor-submit"
            className="bg-white/90 backdrop-blur-md border border-gray-200 rounded-full px-4 py-2 text-sm font-medium text-gray-700 hover:bg-white hover:text-orange-600 transition-all duration-200"
          >
            Submit Listing
          </a>
          <a
            href="/agent-dashboard"
            className="bg-white/90 backdrop-blur-md border border-gray-200 rounded-full px-4 py-2 text-sm font-medium text-gray-700 hover:bg-white hover:text-blue-600 transition-all duration-200"
          >
            Agent Dashboard
          </a>
          <button
            onClick={onChatOpen}
            className="bg-orange-600 text-white rounded-full p-3 shadow-lg hover:bg-orange-700 transition-colors"
          >
            <MessageCircle size={20} />
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 z-40">
        {/* Floating Voice Chat Button */}
        <Button
          onClick={onChatOpen}
          className="fixed bottom-24 right-6 z-50 w-14 h-14 rounded-full bg-orange-500 hover:bg-orange-600 text-white shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110 active:scale-95"
        >
          <MessageSquare size={24} />
        </Button>

        {/* Bottom Navigation */}
        <div className="flex items-center justify-around py-2 px-2 safe-area-bottom">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            
            return (
              <button
                key={tab.id}
                onClick={() => handleTabClick(tab.id)}
                className={`flex flex-col items-center py-2 px-2 rounded-xl transition-all duration-200 ${
                  isActive 
                    ? 'text-blue-600 bg-blue-50' 
                    : 'text-gray-500 hover:text-gray-800 hover:bg-gray-50'
                }`}
              >
                <Icon size={20} className="mb-1" />
                <span className="text-xs font-medium">{tab.label}</span>
              </button>
            );
          })}
        </div>
      </div>
    </>
  );
};
