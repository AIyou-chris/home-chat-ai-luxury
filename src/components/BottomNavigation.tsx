
import { Button } from '@/components/ui/button';
import { Home, Image, Info, Phone, MessageSquare } from 'lucide-react';

interface BottomNavigationProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
  onChatOpen: () => void;
}

export const BottomNavigation = ({ activeTab, onTabChange, onChatOpen }: BottomNavigationProps) => {
  const tabs = [
    { id: 'home', label: 'Home', icon: Home },
    { id: 'gallery', label: 'Gallery', icon: Image },
    { id: 'info', label: 'Info', icon: Info },
    { id: 'contact', label: 'Contact', icon: Phone }
  ];

  return (
    <>
      {/* Floating Voice Chat Button */}
      <Button
        onClick={onChatOpen}
        className="fixed bottom-24 right-6 z-50 w-14 h-14 rounded-full bg-amber-400 hover:bg-amber-500 text-black shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110 active:scale-95"
      >
        <MessageSquare size={24} />
      </Button>

      {/* Bottom Navigation */}
      <div className="fixed bottom-0 left-0 right-0 z-40 bg-black/90 backdrop-blur-md border-t border-gray-800">
        <div className="flex items-center justify-around py-2 px-4 safe-area-bottom">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            
            return (
              <button
                key={tab.id}
                onClick={() => onTabChange(tab.id)}
                className={`flex flex-col items-center py-2 px-3 rounded-xl transition-all duration-200 ${
                  isActive 
                    ? 'text-amber-400 bg-amber-400/10' 
                    : 'text-gray-400 hover:text-white hover:bg-white/5'
                }`}
              >
                <Icon size={24} className="mb-1" />
                <span className="text-xs font-medium">{tab.label}</span>
              </button>
            );
          })}
        </div>
      </div>
    </>
  );
};
