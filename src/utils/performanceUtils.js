/**
 * Performance Optimization Utilities
 * Improve LCP, FID, CLS, and overall performance
 */

import { useEffect, useCallback, useRef, useState } from 'react';

/**
 * 1. Image Optimization Component
 * Lazy loads images with blur placeholder
 */
export const OptimizedImage = ({ 
  src, 
  alt, 
  className = '', 
  priority = false,
  width,
  height,
  onLoad
}) => {
  const [loaded, setLoaded] = useState(false);
  const [inView, setInView] = useState(priority);
  const imgRef = useRef(null);

  useEffect(() => {
    if (priority) return; // Skip lazy loading for priority images

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.disconnect();
        }
      },
      { rootMargin: '50px' }
    );

    if (imgRef.current) {
      observer.observe(imgRef.current);
    }

    return () => observer.disconnect();
  }, [priority]);

  return (
    <div 
      ref={imgRef}
      className={`optimized-image-wrapper ${className}`}
      style={{ position: 'relative', overflow: 'hidden' }}
    >
      {inView && (
        <>
          {!loaded && (
            <div 
              className="image-placeholder"
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                background: 'linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%)',
                backgroundSize: '200% 100%',
                animation: 'loading 1.5s infinite'
              }}
            />
          )}
          <img
            src={src}
            alt={alt}
            width={width}
            height={height}
            loading={priority ? 'eager' : 'lazy'}
            decoding="async"
            fetchpriority={priority ? 'high' : 'auto'}
            onLoad={() => {
              setLoaded(true);
              onLoad?.();
            }}
            style={{
              width: '100%',
              height: 'auto',
              opacity: loaded ? 1 : 0,
              transition: 'opacity 0.3s ease-in-out'
            }}
          />
        </>
      )}
    </div>
  );
};

/**
 * 2. Debounce Hook
 * Optimize search and filter operations
 */
export const useDebounce = (value, delay = 500) => {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => clearTimeout(handler);
  }, [value, delay]);

  return debouncedValue;
};

/**
 * 3. Throttle Hook
 * Optimize scroll and resize handlers
 */
export const useThrottle = (callback, delay = 300) => {
  const lastRun = useRef(Date.now());

  return useCallback((...args) => {
    const now = Date.now();
    if (now - lastRun.current >= delay) {
      callback(...args);
      lastRun.current = now;
    }
  }, [callback, delay]);
};

/**
 * 4. Intersection Observer Hook
 * Detect when elements enter viewport
 */
export const useIntersectionObserver = (options = {}) => {
  const [isIntersecting, setIsIntersecting] = useState(false);
  const [hasIntersected, setHasIntersected] = useState(false);
  const elementRef = useRef(null);

  useEffect(() => {
    const element = elementRef.current;
    if (!element) return;

    const observer = new IntersectionObserver(([entry]) => {
      setIsIntersecting(entry.isIntersecting);
      if (entry.isIntersecting && !hasIntersected) {
        setHasIntersected(true);
      }
    }, {
      threshold: options.threshold || 0.1,
      rootMargin: options.rootMargin || '0px'
    });

    observer.observe(element);

    return () => observer.disconnect();
  }, [hasIntersected, options.threshold, options.rootMargin]);

  return { elementRef, isIntersecting, hasIntersected };
};

/**
 * 5. Lazy Load Component Wrapper
 * Load components only when needed
 */
export const LazyLoadComponent = ({ children, placeholder = null, minHeight = '200px' }) => {
  const { elementRef, hasIntersected } = useIntersectionObserver({ rootMargin: '100px' });

  return (
    <div ref={elementRef} style={{ minHeight }}>
      {hasIntersected ? children : (placeholder || <div>Loading...</div>)}
    </div>
  );
};

/**
 * 6. Preload Critical Resources
 * Preload images, fonts, and other resources
 */
export const preloadResource = (href, as, type = null) => {
  const link = document.createElement('link');
  link.rel = 'preload';
  link.as = as;
  link.href = href;
  if (type) link.type = type;
  if (as === 'font') link.crossOrigin = 'anonymous';
  document.head.appendChild(link);
};

/**
 * 7. Prefetch Next Page
 * Prefetch resources for likely next navigation
 */
export const prefetchPage = (url) => {
  const link = document.createElement('link');
  link.rel = 'prefetch';
  link.href = url;
  document.head.appendChild(link);
};

/**
 * 8. Web Vitals Reporter
 * Monitor Core Web Vitals
 */
export const reportWebVitals = (onPerfEntry) => {
  if (onPerfEntry && onPerfEntry instanceof Function) {
    import('web-vitals').then(({ getCLS, getFID, getFCP, getLCP, getTTFB }) => {
      getCLS(onPerfEntry);
      getFID(onPerfEntry);
      getFCP(onPerfEntry);
      getLCP(onPerfEntry);
      getTTFB(onPerfEntry);
    });
  }
};

/**
 * 9. Resource Hints Component
 * Add to header for better performance
 */
export const ResourceHints = () => {
  useEffect(() => {
    // Preconnect to external domains
    const domains = [
      'https://fonts.googleapis.com',
      'https://fonts.gstatic.com',
      'https://www.googletagmanager.com',
      'https://cdnjs.cloudflare.com'
    ];

    domains.forEach(domain => {
      const link = document.createElement('link');
      link.rel = 'preconnect';
      link.href = domain;
      if (domain.includes('gstatic')) link.crossOrigin = 'anonymous';
      document.head.appendChild(link);
    });

    // DNS prefetch for other domains
    const prefetchDomains = [
      'https://www.google-analytics.com',
      'https://connect.facebook.net'
    ];

    prefetchDomains.forEach(domain => {
      const link = document.createElement('link');
      link.rel = 'dns-prefetch';
      link.href = domain;
      document.head.appendChild(link);
    });
  }, []);

  return null;
};

/**
 * 10. Code Splitting Helper
 * Dynamically import components
 */
export const lazyWithRetry = (componentImport, retries = 3, interval = 1000) => {
  return new Promise((resolve, reject) => {
    componentImport()
      .then(resolve)
      .catch((error) => {
        setTimeout(() => {
          if (retries === 1) {
            reject(error);
            return;
          }
          lazyWithRetry(componentImport, retries - 1, interval).then(resolve, reject);
        }, interval);
      });
  });
};

/**
 * 11. Cache API Response
 * Cache API responses for better performance
 */
export const useCachedFetch = (url, options = {}) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const cacheKey = `cache_${url}`;

  useEffect(() => {
    const fetchData = async () => {
      // Check cache first
      const cached = sessionStorage.getItem(cacheKey);
      if (cached && !options.skipCache) {
        setData(JSON.parse(cached));
        setLoading(false);
        return;
      }

      try {
        const response = await fetch(url, options);
        const result = await response.json();
        
        // Store in cache
        if (!options.skipCache) {
          sessionStorage.setItem(cacheKey, JSON.stringify(result));
        }
        
        setData(result);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [url, cacheKey, options]);

  return { data, loading, error };
};

/**
 * 12. Optimize CSS Animations
 * Use CSS instead of JS for better performance
 */
export const addCriticalCSS = () => {
  const style = document.createElement('style');
  style.innerHTML = `
    @keyframes loading {
      0% { background-position: 200% 0; }
      100% { background-position: -200% 0; }
    }
    
    .fade-in {
      animation: fadeIn 0.3s ease-in;
    }
    
    @keyframes fadeIn {
      from { opacity: 0; }
      to { opacity: 1; }
    }
    
    .slide-up {
      animation: slideUp 0.4s ease-out;
    }
    
    @keyframes slideUp {
      from {
        opacity: 0;
        transform: translateY(20px);
      }
      to {
        opacity: 1;
        transform: translateY(0);
      }
    }
    
    /* Optimize scroll performance */
    * {
      -webkit-font-smoothing: antialiased;
      -moz-osx-font-smoothing: grayscale;
    }
    
    img, video {
      will-change: auto;
    }
  `;
  document.head.appendChild(style);
};

/**
 * 13. Service Worker Registration
 * Enable offline support and caching
 */
export const registerServiceWorker = () => {
  if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
      navigator.serviceWorker
        .register('/service-worker.js')
        .then(registration => {
          console.log('SW registered:', registration);
        })
        .catch(error => {
          console.log('SW registration failed:', error);
        });
    });
  }
};

/**
 * 14. Reduce Layout Shifts (CLS)
 * Reserve space for dynamic content
 */
export const AspectRatioBox = ({ ratio = 16/9, children, className = '' }) => {
  return (
    <div 
      className={`aspect-ratio-box ${className}`}
      style={{
        position: 'relative',
        paddingBottom: `${(1 / ratio) * 100}%`,
        overflow: 'hidden'
      }}
    >
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%'
      }}>
        {children}
      </div>
    </div>
  );
};

/**
 * Usage Example in index.js:
 */
export const initializePerformanceOptimizations = () => {
  // Add critical CSS
  addCriticalCSS();
  
  // Register service worker
  registerServiceWorker();
  
  // Report web vitals
  reportWebVitals((metric) => {
    console.log(metric);
    // Send to analytics
    if (window.gtag) {
      window.gtag('event', metric.name, {
        value: Math.round(metric.name === 'CLS' ? metric.value * 1000 : metric.value),
        event_category: 'Web Vitals',
        event_label: metric.id,
        non_interaction: true,
      });
    }
  });
};

export default {
  OptimizedImage,
//   useDebounce,
//   useThrottle,
//   useIntersectionObserver,
//   LazyLoadComponent,
//   preloadResource,
//   prefetchPage,
//   reportWebVitals,
//   ResourceHints,
//   useCachedFetch,
//   AspectRatioBox,
//   initializePerformanceOptimizations
};