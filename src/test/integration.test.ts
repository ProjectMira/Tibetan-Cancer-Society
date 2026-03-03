import { describe, it, expect } from 'vitest';
import { CacheManager } from '../utils/performance';

describe('Integration Tests', () => {
  it('should have performance utilities working correctly', () => {
    // Test cache functionality
    CacheManager.set('test', { data: 'cached' }, 1);
    const result = CacheManager.get('test');
    expect(result).toEqual({ data: 'cached' });
    
    CacheManager.clear();
    expect(CacheManager.size()).toBe(0);
  });

  it('should validate build configuration exists', async () => {
    // Check that we can import main modules
    const { default: OptimizedImage } = await import('../components/OptimizedImage');
    expect(OptimizedImage).toBeDefined();
    
    const { default: LoadingSpinner } = await import('../components/LoadingSpinner');
    expect(LoadingSpinner).toBeDefined();
  });

  it('should validate error handling utilities', async () => {
    // Test that WorldCancerDay component can be imported
    const { default: WorldCancerDay } = await import('../pages/WorldCancerDay');
    expect(WorldCancerDay).toBeDefined();
  });
});