
import { Button } from '@/components/ui/button';
import { Home, Image, MapPin, User, MessageCircle, FileText } from 'lucide-react';

interface BottomNavigationProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

export const BottomNavigation = ({ activeTab, setActiveTab }: BottomNavigationProps) => {
  const tabs = [
    { id: 'details', label: 'Details', icon: Home },
    { id: 'gallery', label: 'Gallery', icon: Image },
    { id: 'knowledge', label: 'Knowledge', icon: FileText },
    { id: 'neighborhood', label: 'Area', icon: MapPin },
    { id: 'agent', label: 'Agent', icon: User },
    { id: 'contact', label: 'Contact', icon: MessageCircle },
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 z-30">
      <div className="flex justify-around items-center py-2">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          return (
            <Button
              key={tab.id}
              variant="ghost"
              size="sm"
              onClick={() => setActiveTab(tab.id)}
              className={`flex flex-col items-center gap-1 h-auto py-2 px-2 text-xs ${
                activeTab === tab.id 
                  ? 'text-orange-600 bg-orange-50' 
                  : 'text-gray-600 hover:text-orange-600'
              }`}
            >
              <Icon size={18} />
              <span className="font-medium">{tab.label}</span>
            </Button>
          );
        })}
      </div>
    </div>
  );
};
