
import React from 'react';

interface ErrorBoundaryState {
  hasError: boolean;
  error?: Error;
  errorInfo?: React.ErrorInfo;
}

export class ErrorBoundary extends React.Component<
  React.PropsWithChildren<{}>,
  ErrorBoundaryState
> {
  private globalErrorHandler?: (event: ErrorEvent) => void;

  constructor(props: React.PropsWithChildren<{}>) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    console.error('ErrorBoundary caught error:', error);
    
    // Enhanced logging for classList and Hotjar errors
    if (error.message && (error.message.includes('classList') || error.message.includes('hotjar') || error.message.includes('hj'))) {
      console.error('HOTJAR/CLASSLIST ERROR CAUGHT IN BOUNDARY:', {
        message: error.message,
        stack: error.stack,
        name: error.name,
        isHotjarRelated: error.message.includes('hj') || error.stack?.includes('hotjar'),
        timestamp: new Date().toISOString()
      });
    }
    
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('ErrorBoundary details:', error, errorInfo);
    
    // Enhanced logging for Hotjar-related errors
    if (error.message && (error.message.includes('classList') || error.message.includes('hotjar') || error.message.includes('hj'))) {
      console.error('DETAILED HOTJAR ERROR INFO:', {
        error: error,
        errorInfo: errorInfo,
        componentStack: errorInfo.componentStack,
        errorBoundary: this.constructor.name,
        timestamp: new Date().toISOString(),
        hotjarGlobals: {
          hj: typeof (window as any).hj,
          hjSettings: typeof (window as any)._hjSettings,
          hjElements: document.querySelectorAll('[id*="hotjar"], [class*="hotjar"]').length
        }
      });
    }
    
    this.setState({ errorInfo });
  }

  componentDidMount() {
    // Enhanced global error listener for Hotjar and classList errors
    this.globalErrorHandler = (event: ErrorEvent) => {
      const isHotjarError = event.error && event.error.message && 
        (event.error.message.includes('classList') || 
         event.error.message.includes('hotjar') || 
         event.error.message.includes('hj'));
         
      if (isHotjarError) {
        console.error('GLOBAL HOTJAR/CLASSLIST ERROR DETECTED:', {
          message: event.error.message,
          filename: event.filename,
          lineno: event.lineno,
          colno: event.colno,
          stack: event.error.stack,
          target: event.target,
          timestamp: new Date().toISOString(),
          userAgent: navigator.userAgent,
          url: window.location.href
        });
        
        // Attempt to clean up Hotjar interference
        try {
          if ((window as any).hj) {
            console.log('Attempting to disable Hotjar after error...');
            delete (window as any).hj;
          }
          
          // Remove any Hotjar elements that might be causing issues
          const hotjarElements = document.querySelectorAll('[id*="hotjar"], [class*="hotjar"], [data-hj]');
          hotjarElements.forEach(el => el.remove());
          
        } catch (cleanupError) {
          console.error('Error during Hotjar cleanup:', cleanupError);
        }
      }
    };

    window.addEventListener('error', this.globalErrorHandler);
  }

  componentWillUnmount() {
    if (this.globalErrorHandler) {
      window.removeEventListener('error', this.globalErrorHandler);
    }
  }

  render() {
    if (this.state.hasError) {
      const isHotjarError = this.state.error?.message?.includes('classList') || 
                           this.state.error?.message?.includes('hotjar') ||
                           this.state.error?.message?.includes('hj');
      
      return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
          <div className="max-w-md mx-auto text-center p-6">
            <h2 className="text-2xl font-bold text-red-600 mb-4">
              {isHotjarError ? 'Analytics Script Conflict Detected' : 'Something went wrong'}
            </h2>
            <p className="text-gray-700 mb-4">
              {isHotjarError 
                ? 'Hotjar or another analytics script is interfering with the page. This often happens with browser extensions or cached scripts.'
                : 'An error occurred while loading the page.'
              }
            </p>
            <details className="bg-gray-200 p-4 rounded text-xs overflow-auto max-h-32 text-left mb-4">
              <summary className="cursor-pointer font-semibold">Error Details</summary>
              <pre className="mt-2">
                {this.state.error?.message}
                {this.state.error?.stack}
              </pre>
            </details>
            <div className="space-y-2">
              <button
                onClick={() => {
                  // Enhanced cleanup before reload
                  try {
                    if ((window as any).hj) delete (window as any).hj;
                    if ((window as any)._hjSettings) delete (window as any)._hjSettings;
                    const hotjarScripts = document.querySelectorAll('script[src*="hotjar"]');
                    hotjarScripts.forEach(script => script.remove());
                    localStorage.clear();
                    sessionStorage.clear();
                  } catch (e) {
                    console.error('Cleanup error:', e);
                  }
                  window.location.reload();
                }}
                className="w-full px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
              >
                Clear & Reload Page
              </button>
              {isHotjarError && (
                <button
                  onClick={() => {
                    // Try to clean up and retry without reload
                    try {
                      const scripts = document.querySelectorAll('script[src*="hotjar"], script[src*="analytics"]');
                      scripts.forEach(script => script.remove());
                      if ((window as any).hj) delete (window as any).hj;
                      this.setState({ hasError: false, error: undefined, errorInfo: undefined });
                    } catch (e) {
                      console.error('Retry cleanup error:', e);
                      window.location.reload();
                    }
                  }}
                  className="w-full px-4 py-2 bg-orange-500 text-white rounded hover:bg-orange-600"
                >
                  Remove Analytics & Retry
                </button>
              )}
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
