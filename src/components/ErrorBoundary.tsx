
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
  constructor(props: React.PropsWithChildren<{}>) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    console.error('ErrorBoundary caught error:', error);
    
    // Check if this is the classList error we're tracking
    if (error.message && error.message.includes('classList')) {
      console.error('CLASSLIST ERROR CAUGHT IN BOUNDARY:', {
        message: error.message,
        stack: error.stack,
        name: error.name
      });
    }
    
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('ErrorBoundary details:', error, errorInfo);
    
    // Enhanced logging for classList errors
    if (error.message && error.message.includes('classList')) {
      console.error('DETAILED CLASSLIST ERROR INFO:', {
        error: error,
        errorInfo: errorInfo,
        componentStack: errorInfo.componentStack,
        errorBoundary: this.constructor.name,
        timestamp: new Date().toISOString()
      });
    }
    
    this.setState({ errorInfo });
  }

  componentDidMount() {
    // Add a global error listener to catch any remaining errors
    const globalErrorHandler = (event) => {
      if (event.error && event.error.message && event.error.message.includes('classList')) {
        console.error('GLOBAL CLASSLIST ERROR DETECTED:', {
          message: event.error.message,
          filename: event.filename,
          lineno: event.lineno,
          colno: event.colno,
          stack: event.error.stack,
          target: event.target,
          timestamp: new Date().toISOString()
        });
      }
    };

    window.addEventListener('error', globalErrorHandler);
    
    // Clean up on unmount
    this.globalErrorHandler = globalErrorHandler;
  }

  componentWillUnmount() {
    if (this.globalErrorHandler) {
      window.removeEventListener('error', this.globalErrorHandler);
    }
  }

  render() {
    if (this.state.hasError) {
      const isClassListError = this.state.error?.message?.includes('classList');
      
      return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
          <div className="max-w-md mx-auto text-center p-6">
            <h2 className="text-2xl font-bold text-red-600 mb-4">
              {isClassListError ? 'Script Conflict Detected' : 'Something went wrong'}
            </h2>
            <p className="text-gray-700 mb-4">
              {isClassListError 
                ? 'A browser extension or external script is interfering with the page. Try disabling extensions or using incognito mode.'
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
                  this.setState({ hasError: false, error: undefined, errorInfo: undefined });
                  window.location.reload();
                }}
                className="w-full px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
              >
                Reload Page
              </button>
              {isClassListError && (
                <button
                  onClick={() => {
                    // Try to clear any problematic scripts
                    const scripts = document.querySelectorAll('script[src*="hotjar"], script[src*="analytics"]');
                    scripts.forEach(script => script.remove());
                    this.setState({ hasError: false, error: undefined, errorInfo: undefined });
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
