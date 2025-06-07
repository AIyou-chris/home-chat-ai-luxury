
export const preventHotjarInterference = () => {
  console.log('=== HOTJAR PREVENTION SYSTEM ===');
  
  // Block Hotjar from initializing
  if (typeof window !== 'undefined') {
    try {
      // Override hj before it can be defined
      (window as any).hj = function() {
        console.warn('Hotjar call blocked to prevent React interference');
      };
      
      // Mark it as already initialized to prevent real initialization
      (window as any).hj.q = [];
      (window as any)._hjSettings = { hjid: 0, hjsv: 0 };
      
      // Block common Hotjar methods that cause classList errors
      const blockedMethods = ['init', 'render', 'identify', 'track'];
      blockedMethods.forEach(method => {
        (window as any).hj[method] = function() {
          console.warn(`Hotjar method '${method}' blocked`);
        };
      });
      
      console.log('Hotjar initialization blocked');
    } catch (error) {
      console.error('Error in preventHotjarInterference:', error);
    }
  }
};

export const removeHotjarScripts = () => {
  console.log('Removing any existing Hotjar scripts...');
  
  try {
    // Remove script elements
    const hotjarScripts = document.querySelectorAll('script[src*="hotjar"], script[data-src*="hotjar"]');
    hotjarScripts.forEach((script, index) => {
      console.log(`Removing Hotjar script ${index}`);
      script.remove();
    });
    
    // Remove Hotjar-created elements that might cause classList errors
    const hotjarElements = document.querySelectorAll('[id*="hotjar"], [class*="hotjar"], [data-hj*=""], [hjid]');
    hotjarElements.forEach((element, index) => {
      console.log(`Removing Hotjar element ${index}:`, element);
      element.remove();
    });
    
    // Clear Hotjar globals
    if ((window as any).hj) {
      console.log('Clearing Hotjar global variables');
      delete (window as any).hj;
    }
    if ((window as any)._hjSettings) {
      delete (window as any)._hjSettings;
    }
    
    console.log('Hotjar script removal completed');
  } catch (error) {
    console.error('Error removing Hotjar scripts:', error);
  }
};

export const setupDOMProtection = () => {
  console.log('Setting up DOM protection against external scripts...');
  
  try {
    // Only override classList methods for elements that might be targeted by Hotjar
    const originalClassListAdd = Element.prototype.classList?.add;
    if (originalClassListAdd) {
      Element.prototype.classList.add = function(...classes: string[]) {
        try {
          // Check if this element might be a Hotjar target
          const isHotjarTarget = this.id?.includes('hotjar') || 
                                 this.className?.includes('hotjar') ||
                                 this.hasAttribute?.('data-hj');
          
          if (isHotjarTarget) {
            console.warn('Blocked classList.add on potential Hotjar element:', this);
            return;
          }
          
          // Allow normal React operations
          if (this && this.classList) {
            return originalClassListAdd.apply(this.classList, classes);
          }
        } catch (error) {
          console.warn('classList.add blocked for safety:', error);
        }
      };
    }
    
    console.log('DOM protection setup completed');
  } catch (error) {
    console.error('Error setting up DOM protection:', error);
  }
};
