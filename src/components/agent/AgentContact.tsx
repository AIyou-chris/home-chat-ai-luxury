
import { Instagram, Facebook, Twitter, Mail, Phone } from 'lucide-react';

export const AgentContact = () => {
  return (
    <div className="space-y-4">
      <div className="flex flex-wrap gap-3">
        <a href="mailto:michael.sterling@luxuryrealty.com" className="flex items-center text-gray-700 hover:text-orange-600">
          <Mail size={16} className="mr-1" />
          <span className="text-sm">michael.sterling@luxuryrealty.com</span>
        </a>
        <a href="tel:3105550123" className="flex items-center text-gray-700 hover:text-orange-600">
          <Phone size={16} className="mr-1" />
          <span className="text-sm">(310) 555-0123</span>
        </a>
      </div>
      
      <div className="flex space-x-3">
        <a href="https://instagram.com/michaelsterlingrealty" target="_blank" rel="noopener noreferrer" className="bg-gray-100 hover:bg-gray-200 p-2 rounded-full text-gray-600 hover:text-pink-600 transition-colors">
          <Instagram size={18} />
        </a>
        <a href="https://facebook.com/michaelsterlingrealestate" target="_blank" rel="noopener noreferrer" className="bg-gray-100 hover:bg-gray-200 p-2 rounded-full text-gray-600 hover:text-blue-600 transition-colors">
          <Facebook size={18} />
        </a>
        <a href="https://twitter.com/msterlinghomes" target="_blank" rel="noopener noreferrer" className="bg-gray-100 hover:bg-gray-200 p-2 rounded-full text-gray-600 hover:text-blue-400 transition-colors">
          <Twitter size={18} />
        </a>
      </div>
    </div>
  );
};
