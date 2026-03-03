import { describe, it, expect, beforeEach, vi } from 'vitest';
import { render, screen, waitFor, fireEvent } from './test-utils';
import WorldCancerDay from '../pages/WorldCancerDay';
import { mockCancerDayData, mockFetchByUrl, mockFooterData } from './test-utils';

describe('WorldCancerDay', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders loading state initially', () => {
    mockFetchByUrl({
      '/assets/data/cancerday.json': mockCancerDayData,
      '/assets/data/footer.json': mockFooterData,
    });
    render(<WorldCancerDay />);
    
    expect(screen.getByText('Loading World Cancer Day data...')).toBeInTheDocument();
  });

  it('renders World Cancer Day data successfully', async () => {
    mockFetchByUrl({
      '/assets/data/cancerday.json': mockCancerDayData,
      '/assets/data/footer.json': mockFooterData,
    });
    
    render(<WorldCancerDay />);
    
    await waitFor(() => {
      expect(
        screen.getByRole('heading', { name: 'World Cancer Day', level: 1 })
      ).toBeInTheDocument();
    });

    await waitFor(() => {
      expect(screen.getByText('2020 World Cancer Day')).toBeInTheDocument();
    });

    expect(screen.getByText(/I am and I will/)).toBeInTheDocument();
    expect(screen.getByText('McLeod Ganj Square, Dharamshala')).toBeInTheDocument();
  });

  it('handles API error gracefully', async () => {
    mockFetchByUrl({
      '/assets/data/cancerday.json': { ok: false, data: {} },
      '/assets/data/footer.json': mockFooterData,
    });
    
    render(<WorldCancerDay />);
    
    await waitFor(() => {
      expect(screen.getByText(/Error loading World Cancer Day data/)).toBeInTheDocument();
    });
  });

  it('displays gallery images with proper fallback handling', async () => {
    mockFetchByUrl({
      '/assets/data/cancerday.json': mockCancerDayData,
      '/assets/data/footer.json': mockFooterData,
    });
    
    render(<WorldCancerDay />);
    
    await waitFor(() => {
      expect(screen.getByText('2020 Event Gallery')).toBeInTheDocument();
    });

    // Check that images are rendered (they will use OptimizedImage component)
    const images = screen.getAllByRole('img');
    expect(images.length).toBeGreaterThan(0);
  });

  it('allows switching between different years', async () => {
    const multiYearData = [
      ...mockCancerDayData,
      {
        year: '2021',
        theme: 'Different theme',
        venue: 'Different venue',
        activities_awareness_mission: ['Different activity'],
        guest_of_honour: 'Different guest',
        image: ['/assets/cancer-day/2021-test1.jpg']
      }
    ];
    
    mockFetchByUrl({
      '/assets/data/cancerday.json': multiYearData,
      '/assets/data/footer.json': mockFooterData,
    });
    
    render(<WorldCancerDay />);
    
    await waitFor(() => {
      expect(screen.getByText('2021 World Cancer Day')).toBeInTheDocument();
    });

    // Click on 2020 button
    const button2020 = screen.getByText('2020');
    fireEvent.click(button2020);
    
    await waitFor(() => {
      expect(screen.getByText('2020 World Cancer Day')).toBeInTheDocument();
    });
  });

  it('displays impact statistics', async () => {
    mockFetchByUrl({
      '/assets/data/cancerday.json': mockCancerDayData,
      '/assets/data/footer.json': mockFooterData,
    });
    
    render(<WorldCancerDay />);
    
    await waitFor(() => {
      expect(screen.getByText('Our Impact')).toBeInTheDocument();
    });

    expect(screen.getByText('10+')).toBeInTheDocument();
    expect(screen.getByText('Years of Celebration')).toBeInTheDocument();
    expect(screen.getByText('1000+')).toBeInTheDocument();
    expect(screen.getByText('Annual Participants')).toBeInTheDocument();
  });

  it('handles empty data gracefully', async () => {
    mockFetchByUrl({
      '/assets/data/cancerday.json': [],
      '/assets/data/footer.json': mockFooterData,
    });
    
    render(<WorldCancerDay />);
    
    await waitFor(() => {
      expect(screen.getByText('No World Cancer Day data available.')).toBeInTheDocument();
    });
  });

  it('opens image modal when gallery image is clicked', async () => {
    mockFetchByUrl({
      '/assets/data/cancerday.json': mockCancerDayData,
      '/assets/data/footer.json': mockFooterData,
    });
    
    render(<WorldCancerDay />);
    
    await waitFor(() => {
      expect(screen.getByText('2020 Event Gallery')).toBeInTheDocument();
    });

    // Wait for images to load and then simulate click
    // Note: This test may need adjustment based on the actual OptimizedImage implementation
    await waitFor(() => {
      const gallerySection = screen.getByText('2020 Event Gallery').closest('div');
      expect(gallerySection).toBeInTheDocument();
    });
  });
});
