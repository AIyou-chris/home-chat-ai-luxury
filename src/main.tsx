
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { ErrorBoundary } from './components/ErrorBoundary'
import { preventHotjarInterference, removeHotjarScripts, setupDOMProtection } from './utils/hotjarPrevention'

// Prevent Hotjar interference before React initialization
console.log('Initializing app with Hotjar prevention...');

try {
  preventHotjarInterference();
  removeHotjarScripts();
  setupDOMProtection();
  console.log('Hotjar prevention completed successfully');
} catch (error) {
  console.error('Error during Hotjar prevention - continuing with app startup:', error);
}

// Additional safety: Remove any analytics scripts that might interfere
const removeInterferingScripts = () => {
  try {
    const interferingScripts = document.querySelectorAll('script[src*="static.hotjar.com"], script[src*="analytics"], script[src*="gtag"]');
    interferingScripts.forEach(script => {
      console.log('Removing interfering script:', (script as HTMLScriptElement).src);
      script.remove();
    });
  } catch (error) {
    console.error('Error removing interfering scripts:', error);
  }
};

// Run script removal immediately and after DOM content loaded
removeInterferingScripts();
document.addEventListener('DOMContentLoaded', removeInterferingScripts);

console.log('About to render React app...');

try {
  createRoot(document.getElementById("root")!).render(
    <ErrorBoundary>
      <App />
    </ErrorBoundary>
  );
  console.log('React app rendered successfully');
} catch (error) {
  console.error('Error rendering React app:', error);
  // Fallback rendering
  document.getElementById("root")!.innerHTML = `
    <div style="padding: 20px; text-align: center; font-family: Arial, sans-serif;">
      <h2>Loading Error</h2>
      <p>There was an error loading the application. Please refresh the page.</p>
      <button onclick="window.location.reload()" style="padding: 10px 20px; background: #007bff; color: white; border: none; border-radius: 5px; cursor: pointer;">
        Refresh Page
      </button>
    </div>
  `;
}
