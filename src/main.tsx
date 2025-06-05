
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { preventHotjarInterference, removeHotjarScripts, setupDOMProtection } from './utils/hotjarPrevention'

// Prevent Hotjar interference before React initialization
console.log('Initializing app with Hotjar prevention...');
preventHotjarInterference();
removeHotjarScripts();
setupDOMProtection();

// Additional safety: Remove any analytics scripts that might interfere
const removeInterferingScripts = () => {
  const interferingScripts = document.querySelectorAll('script[src*="static.hotjar.com"], script[src*="analytics"], script[src*="gtag"]');
  interferingScripts.forEach(script => {
    console.log('Removing interfering script:', (script as HTMLScriptElement).src);
    script.remove();
  });
};

// Run script removal immediately and after DOM content loaded
removeInterferingScripts();
document.addEventListener('DOMContentLoaded', removeInterferingScripts);

createRoot(document.getElementById("root")!).render(<App />);
