// 简单的性能监控工具
export class PerformanceMonitor {
    private static instance: PerformanceMonitor;
    private metrics: Map<string, number> = new Map();

    static getInstance(): PerformanceMonitor {
        if (!PerformanceMonitor.instance) {
            PerformanceMonitor.instance = new PerformanceMonitor();
        }
        return PerformanceMonitor.instance;
    }

    startTimer(name: string): void {
        this.metrics.set(name, performance.now());
    }

    endTimer(name: string): number {
        const startTime = this.metrics.get(name);
        if (!startTime) {
            console.warn(`Timer ${name} was not started`);
            return 0;
        }
        
        const duration = performance.now() - startTime;
        this.metrics.delete(name);
        
        if (process.env.NODE_ENV === 'development') {
            console.log(`⏱️ ${name}: ${duration.toFixed(2)}ms`);
        }
        
        return duration;
    }

    measurePageLoad(): void {
        if (typeof window !== 'undefined') {
            window.addEventListener('load', () => {
                const navigation = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming;
                const loadTime = navigation.loadEventEnd - navigation.fetchStart;
                
                if (process.env.NODE_ENV === 'development') {
                    console.log(`📊 Page load time: ${loadTime.toFixed(2)}ms`);
                }
            });
        }
    }

    measureLCP(): void {
        if (typeof window !== 'undefined' && 'PerformanceObserver' in window) {
            const observer = new PerformanceObserver((list) => {
                const entries = list.getEntries();
                const lastEntry = entries[entries.length - 1];
                
                if (process.env.NODE_ENV === 'development') {
                    console.log(`🎯 LCP: ${lastEntry.startTime.toFixed(2)}ms`);
                }
            });
            
            observer.observe({ entryTypes: ['largest-contentful-paint'] });
        }
    }
}

export const monitor = PerformanceMonitor.getInstance();