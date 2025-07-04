
export const detectAnalyticsScripts = () => {
  console.log('=== ANALYTICS DETECTION REPORT ===');
  
  // Check for script tags
  const scripts = document.querySelectorAll('script');
  const analyticsScripts = [];
  
  scripts.forEach((script, index) => {
    const scriptElement = script as HTMLScriptElement;
    const src = scriptElement.src || scriptElement.innerHTML;
    if (src && (
      src.includes('hotjar') || 
      src.includes('analytics') || 
      src.includes('gtag') || 
      src.includes('googletagmanager') ||
      src.includes('facebook') ||
      src.includes('fbevents')
    )) {
      analyticsScripts.push({
        index,
        src: scriptElement.src,
        innerHTML: scriptElement.innerHTML.substring(0, 100),
        id: scriptElement.id,
        className: scriptElement.className
      });
    }
  });

  if (analyticsScripts.length > 0) {
    console.warn('Found analytics scripts:', analyticsScripts);
  }

  // Check for global variables
  const analyticsGlobals = ['hj', 'gtag', 'ga', '_gaq', 'dataLayer', 'fbq'];
  const foundGlobals = [];
  
  analyticsGlobals.forEach(global => {
    if ((window as any)[global]) {
      foundGlobals.push({
        name: global,
        type: typeof (window as any)[global],
        hasInit: typeof (window as any)[global]?.init === 'function',
        hasRender: typeof (window as any)[global]?.render === 'function'
      });
    }
  });

  if (foundGlobals.length > 0) {
    console.warn('Found analytics globals:', foundGlobals);
  }

  // Check for elements with tracking attributes
  const trackingElements = document.querySelectorAll('[data-hotjar], [data-gtag], [data-analytics], [class*="hotjar"], [id*="hotjar"]');
  if (trackingElements.length > 0) {
    console.warn('Found tracking elements:', trackingElements);
  }

  // Check document head for any meta tags related to analytics
  const metaTags = document.querySelectorAll('meta[name*="google"], meta[property*="fb"], meta[name*="hotjar"]');
  if (metaTags.length > 0) {
    console.warn('Found analytics meta tags:', metaTags);
  }

  console.log('=== END ANALYTICS DETECTION ===');
  
  return {
    scripts: analyticsScripts,
    globals: foundGlobals,
    elements: Array.from(trackingElements),
    metaTags: Array.from(metaTags)
  };
};

export const cleanupAnalyticsScripts = () => {
  console.log('Attempting to cleanup analytics scripts...');
  
  try {
    // Remove known analytics scripts
    const scriptsToRemove = document.querySelectorAll('script[src*="hotjar"], script[src*="analytics"], script[src*="gtag"]');
    scriptsToRemove.forEach((script, index) => {
      const scriptElement = script as HTMLScriptElement;
      console.log(`Removing script ${index}:`, scriptElement.src);
      script.remove();
    });

    // Clear global variables
    const globalsToDelete = ['hj', 'gtag', 'ga', '_gaq'];
    globalsToDelete.forEach(global => {
      if ((window as any)[global]) {
        console.log(`Clearing global: ${global}`);
        delete (window as any)[global];
      }
    });

    console.log('Analytics cleanup completed');
    return true;
  } catch (error) {
    console.error('Error during analytics cleanup:', error);
    return false;
  }
};
