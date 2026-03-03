import { describe, it, expect, beforeEach, vi } from 'vitest';
import { render, screen, fireEvent, waitFor } from './test-utils';
import OptimizedImage from '../components/OptimizedImage';

describe('OptimizedImage', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    
    // Mock IntersectionObserver
    const mockIntersectionObserver = vi.fn();
    mockIntersectionObserver.mockReturnValue({
      observe: vi.fn(),
      unobserve: vi.fn(),
      disconnect: vi.fn(),
    });
    window.IntersectionObserver = mockIntersectionObserver;
  });

  it('renders loading state initially with lazy loading', () => {
    render(
      <OptimizedImage
        src="/test-image.jpg"
        alt="Test image"
        loading="lazy"
      />
    );
    
    expect(screen.getByText('Loading...')).toBeInTheDocument();
  });

  it('renders image immediately with eager loading', async () => {
    render(
      <OptimizedImage
        src="/test-image.jpg"
        alt="Test image"
        loading="eager"
      />
    );
    
    await waitFor(() => {
      const image = screen.getByRole('img');
      expect(image).toBeInTheDocument();
      expect(image).toHaveAttribute('src', '/test-image.jpg');
      expect(image).toHaveAttribute('alt', 'Test image');
    });
  });

  it('handles image load error with fallback', async () => {
    const fallbackSrc = '/fallback-image.jpg';
    
    render(
      <OptimizedImage
        src="/broken-image.jpg"
        alt="Test image"
        fallbackSrc={fallbackSrc}
        loading="eager"
      />
    );
    
    // Get the image and simulate error
    const image = await screen.findByRole('img');
    fireEvent.error(image);
    
    await waitFor(() => {
      expect(image).toHaveAttribute('src', fallbackSrc);
    });
  });

  it('uses placeholder when both original and fallback fail', async () => {
    render(
      <OptimizedImage
        src="/broken-image.jpg"
        alt="Test image"
        width={400}
        height={300}
        loading="eager"
      />
    );
    
    const image = await screen.findByRole('img');
    
    // First failure tries an alternate extension.
    fireEvent.error(image);
    await waitFor(() => {
      expect(image.src).toContain('broken-image.jpeg');
    });

    // Second failure should fall back to placeholder.
    fireEvent.error(image);
    
    await waitFor(() => {
      expect(image.src).toContain('placeholder');
      expect(image.src).toContain('400x300');
      expect(image.src).toContain('Test%20image');
    });
  });

  it('calls onClick handler when clicked', async () => {
    const handleClick = vi.fn();
    
    render(
      <OptimizedImage
        src="/test-image.jpg"
        alt="Test image"
        onClick={handleClick}
        loading="eager"
      />
    );
    
    const image = await screen.findByRole('img');
    fireEvent.click(image);
    
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it('calls onLoad callback when image loads successfully', async () => {
    const handleLoad = vi.fn();
    
    render(
      <OptimizedImage
        src="/test-image.jpg"
        alt="Test image"
        onLoad={handleLoad}
        loading="eager"
      />
    );
    
    const image = await screen.findByRole('img');
    fireEvent.load(image);
    
    expect(handleLoad).toHaveBeenCalledTimes(1);
  });

  it('calls onError callback when image fails to load', async () => {
    const handleError = vi.fn();
    
    render(
      <OptimizedImage
        src="/broken-image.jpg"
        alt="Test image"
        onError={handleError}
        loading="eager"
      />
    );
    
    const image = await screen.findByRole('img');
    fireEvent.error(image);
    fireEvent.error(image);
    
    expect(handleError).toHaveBeenCalledTimes(1);
  });

  it('applies custom className and styles', async () => {
    const customStyle = { border: '1px solid red' };
    
    render(
      <OptimizedImage
        src="/test-image.jpg"
        alt="Test image"
        className="custom-class"
        style={customStyle}
        loading="eager"
      />
    );
    
    const container = screen.getByRole('img').closest('div');
    expect(container).toHaveClass('custom-class');
  });

  it('sets correct dimensions when provided', async () => {
    render(
      <OptimizedImage
        src="/test-image.jpg"
        alt="Test image"
        width={500}
        height={300}
        loading="eager"
      />
    );
    
    const container = screen.getByRole('img').closest('div');
    expect(container).toHaveStyle({ width: '500px', height: '300px' });
  });

  it('shows loading overlay when image is loading', async () => {
    render(
      <OptimizedImage
        src="/slow-image.jpg"
        alt="Test image"
        loading="eager"
      />
    );
    
    await waitFor(() => {
      expect(screen.getByText('Loading...')).toBeInTheDocument();
    });
  });
});
