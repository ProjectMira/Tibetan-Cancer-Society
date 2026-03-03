import { expect, afterEach, beforeEach, vi } from 'vitest';
import { cleanup } from '@testing-library/react';
import * as matchers from '@testing-library/jest-dom/matchers';

// Add custom matchers
expect.extend(matchers);

// Clean up after each test
afterEach(() => {
  cleanup();
  vi.clearAllMocks();
});

// Mock IntersectionObserver
global.IntersectionObserver = class IntersectionObserver {
  constructor() {}
  observe() {
    return null;
  }
  disconnect() {
    return null;
  }
  unobserve() {
    return null;
  }
};

// Mock ResizeObserver (used by recharts ResponsiveContainer)
global.ResizeObserver = class ResizeObserver {
  constructor() {}
  observe() {
    return null;
  }
  unobserve() {
    return null;
  }
  disconnect() {
    return null;
  }
};

// Mock fetch for API calls
global.fetch = vi.fn();

beforeEach(() => {
  const defaultFooterData = {
    organization: {
      name: 'Tibetan Cancer Society',
      description: 'Test description',
      socialMedia: [],
    },
    contact: {
      mainAddress: 'Main address',
      delhiAddress: 'Delhi address',
      southAddress: 'South address',
      phone: '+91 82172 11567',
      landline: '+91 1892318799',
      email: 'tibetancancersocietys@gmail.com',
    },
  };

  vi.mocked(global.fetch).mockImplementation(
    async () =>
      ({
        ok: true,
        json: async () => defaultFooterData,
      }) as Response
  );
});

// Mock matchMedia
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: vi.fn().mockImplementation(query => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: vi.fn(), // deprecated
    removeListener: vi.fn(), // deprecated
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    dispatchEvent: vi.fn(),
  })),
});
