import React from 'react';
import { render, RenderOptions } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { TooltipProvider } from '@/components/ui/tooltip';
import { vi } from 'vitest';

// Create a custom render function with providers
const AllProviders = ({ children }: { children: React.ReactNode }) => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
      },
    },
  });

  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <TooltipProvider>
          {children}
        </TooltipProvider>
      </BrowserRouter>
    </QueryClientProvider>
  );
};

const customRender = (
  ui: React.ReactElement,
  options?: Omit<RenderOptions, 'wrapper'>
) => render(ui, { wrapper: AllProviders, ...options });

// Mock data for tests
export const mockPrograms = [
  {
    id: '1',
    title: 'Cancer Awareness Camp',
    shortDescription: 'Early detection and awareness programs',
    fullDescription: 'Comprehensive cancer awareness and screening programs',
    icon: 'Heart',
    image: '/assets/programs/cancer-awareness.jpg',
    features: ['Free screening', 'Educational talks', 'Early detection'],
    stats: [
      { value: '1000+', label: 'People screened' },
      { value: '50+', label: 'Camps conducted' }
    ],
    contactPerson: 'Dr. Test',
    contactEmail: 'test@example.com'
  }
];

export const mockCancerDayData = [
  {
    year: '2020',
    theme: 'I am and I will',
    venue: 'McLeod Ganj Square, Dharamshala',
    activities_awareness_mission: [
      'Cancer Awareness Campaign',
      'Free Screening and Check-up Camp'
    ],
    guest_of_honour: 'Test Guest',
    image: [
      '/assets/cancer-day/2020-test1.jpg',
      '/assets/cancer-day/2020-test2.jpg'
    ]
  }
];

export const mockFooterData = {
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

// Mock fetch responses
const createJsonResponse = (data: unknown, ok: boolean = true): Response =>
  ({
    ok,
    json: async () => data,
  }) as Response;

const getRequestUrl = (input: RequestInfo | URL): string => {
  if (typeof input === 'string') return input;
  if (input instanceof URL) return input.toString();
  return input.url;
};

export const mockFetchSuccess = (data: unknown) => {
  vi.mocked(global.fetch).mockResolvedValueOnce(createJsonResponse(data));
};

export const mockFetchError = () => {
  vi.mocked(global.fetch).mockRejectedValueOnce(new Error('API Error'));
};

export const mockFetchByUrl = (
  routeData: Record<string, unknown | Error | { ok: boolean; data: unknown }>,
  fallbackData: unknown = {}
) => {
  vi.mocked(global.fetch).mockImplementation(async (input) => {
    const url = getRequestUrl(input);
    const matchedEntry = Object.entries(routeData).find(([pattern]) =>
      url.includes(pattern)
    );

    const value = matchedEntry ? matchedEntry[1] : fallbackData;
    if (value instanceof Error) {
      throw value;
    }
    if (
      typeof value === 'object' &&
      value !== null &&
      'ok' in value &&
      'data' in value
    ) {
      const responseValue = value as { ok: boolean; data: unknown };
      return createJsonResponse(responseValue.data, responseValue.ok);
    }

    return createJsonResponse(value);
  });
};

// Re-export everything
export * from '@testing-library/react';
export { customRender as render };
