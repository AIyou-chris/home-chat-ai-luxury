
import { AlertTriangle } from 'lucide-react';

export const LegalDisclaimer = () => {
  return (
    <div className="bg-amber-50 border-t border-amber-200 px-4 py-2">
      <div className="flex items-start space-x-2">
        <AlertTriangle size={14} className="text-amber-600 mt-0.5 flex-shrink-0" />
        <p className="text-xs text-amber-800">
          <strong>Legal Disclaimer:</strong> Property restrictions and regulations can change. 
          Always verify information with real estate attorneys, title companies, and local planning departments before making decisions.
        </p>
      </div>
    </div>
  );
};
