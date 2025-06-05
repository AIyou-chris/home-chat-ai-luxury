
export const safeClassListAdd = (element: Element | null, ...classes: string[]) => {
  try {
    if (element && element.classList && typeof element.classList.add === 'function') {
      element.classList.add(...classes);
      return true;
    }
  } catch (error) {
    console.warn('Safe classList.add prevented error:', error);
  }
  return false;
};

export const safeQuerySelector = (selector: string): Element | null => {
  try {
    if (document && typeof document.querySelector === 'function') {
      return document.querySelector(selector);
    }
  } catch (error) {
    console.warn('Safe querySelector prevented error:', error);
  }
  return null;
};

export const safeScrollIntoView = (element: Element | null) => {
  try {
    if (element && typeof element.scrollIntoView === 'function') {
      element.scrollIntoView({ behavior: 'smooth' });
      return true;
    }
  } catch (error) {
    console.warn('Safe scrollIntoView prevented error:', error);
  }
  return false;
};

export const waitForElement = (selector: string, timeout: number = 5000): Promise<Element | null> => {
  return new Promise((resolve) => {
    const element = safeQuerySelector(selector);
    if (element) {
      resolve(element);
      return;
    }

    const observer = new MutationObserver(() => {
      const element = safeQuerySelector(selector);
      if (element) {
        observer.disconnect();
        resolve(element);
      }
    });

    observer.observe(document.body, {
      childList: true,
      subtree: true
    });

    setTimeout(() => {
      observer.disconnect();
      resolve(null);
    }, timeout);
  });
};
