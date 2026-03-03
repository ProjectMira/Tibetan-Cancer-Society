// Utility for mapping missing World Cancer Day images to available alternatives

interface ImageMapping {
  [key: string]: string[];
}

// Get all available 2024 images from camps directory
const get2024CampImages = (): string[] => [
  '/assets/camps/2024-himachal-dobhi1.jpg',
  '/assets/camps/2024-himachal-dobhi2.jpg',
  '/assets/camps/2024-himachal-dobhi3.jpg',
  '/assets/camps/2024-himachal-dobhi4.jpg',
  '/assets/camps/2024-himachal-dobhi5.jpg',
  '/assets/camps/2024-himachal-dobhi6.jpg',
  '/assets/camps/2024-himachal-dobhi7.jpg',
  '/assets/camps/2024-himachal-dobhi8.jpg',
  '/assets/camps/2024-himachal-dobhi9.jpg',
  '/assets/camps/2024-himachal-pondoh1.jpg',
  '/assets/camps/2024-himachal-pondoh2.jpg',
  '/assets/camps/2024-himachal-pondoh3.jpg',
  '/assets/camps/2024-himachal-pondoh4.jpg',
  '/assets/camps/2024-himachal-pondoh5.jpg',
  '/assets/camps/2024-himachal-pondoh6.jpg',
  '/assets/camps/2024-himachal-pondoh7.jpg',
  '/assets/camps/2024-himachal-pondoh8.jpg',
  '/assets/camps/2024-himachal-pondoh9.jpg',
  '/assets/camps/2024-himachal-pondoh10.jpg',
  '/assets/camps/2024-himachal-rewalser1.jpg',
  '/assets/camps/2024-himachal-rewalser2.jpg',
  '/assets/camps/2024-himachal-rewalser3.jpg',
  '/assets/camps/2024-himachal-rewalser4.jpg',
  '/assets/camps/2024-himachal-rewalser5.jpg',
  '/assets/camps/2024-Ladakh-Diskit8.jpg',
  '/assets/camps/2024-Ladakh-Diskit9.jpg',
  '/assets/camps/2024-Ladakh-Diskit10.jpg',
  '/assets/camps/2024-Ladakh-Diskit11.jpg',
  '/assets/camps/2024-Ladakh-Diskit12.jpg',
  '/assets/camps/2024-Ladakh-Diskit13.jpg',
  '/assets/camps/2024-Ladakh-Nimmo1.jpg',
  '/assets/camps/2024-Ladakh-Nimmo2.jpg',
  '/assets/camps/2024-Ladakh-Nimmo3.jpg',
  '/assets/camps/2024-Ladakh-Khaltse10.jpg'
];

// Get available 2020 images from camps directory
const get2020CampImages = (): string[] => [
  '/assets/camps/2020-ladakh-changthangsumdoh1.jpg',
  '/assets/camps/2020-ladakh-changthangsumdoh2.jpg',
  '/assets/camps/2020-ladakh-changthangsumdoh3.jpg',
  '/assets/camps/2020-ladakh-changthangsumdoh4.jpg',
  '/assets/camps/2020-ladakh-changthangsumdoh5.jpg',
  '/assets/camps/2020-ladakh-changthangsumdoh6.jpg',
  '/assets/camps/2020-ladakh-choglamser1.jpg',
  '/assets/camps/2020-ladakh-choglamser2.jpg',
  '/assets/camps/2020-ladakh-choglamser3.jpg',
  '/assets/camps/2020-ladakh-choglamser4.jpg',
  '/assets/camps/2020-ladakh-choglamser5.jpg',
  '/assets/camps/2020-ladakh-choglamser6.jpg',
  '/assets/camps/2020-ladakh-samath1.jpg',
  '/assets/camps/2020-ladakh-samath2.jpg',
  '/assets/camps/2020-ladakh-samath3.jpg',
  '/assets/camps/2020-ladakh-samath4.jpg',
  '/assets/camps/2020-ladakh-samath5.jpg',
  '/assets/camps/2020-ladakh-samath6.jpg'
];

/**
 * Get fallback image for a missing World Cancer Day image
 * @param originalPath - The original image path from JSON
 * @param index - The index of the image in the array (for cycling through alternatives)
 * @returns Fallback image path or null if no suitable fallback
 */
export const getImageFallback = (originalPath: string, index: number): string | null => {
  // Handle 2020 images
  if (originalPath.includes('2020-himachalpradesh-dhasa') && originalPath.includes('/assets/cancer-day/')) {
    const available2020 = get2020CampImages();
    return available2020[index % available2020.length];
  }
  
  // Handle 2024 images
  if (originalPath.includes('2024-hima-dhasa') && originalPath.includes('/assets/cancer-day/')) {
    const available2024 = get2024CampImages();
    return available2024[index % available2024.length];
  }
  
  // Handle 2025 images (use recent images as placeholders)
  if (originalPath.includes('2025-delhi-aiims') && originalPath.includes('/assets/cancer-day/')) {
    const recentImages = get2024CampImages().slice(0, 10); // Use first 10 2024 images
    return recentImages[index % recentImages.length];
  }
  
  return null;
};

/**
 * Check if an image path is likely to be missing based on known patterns
 * @param imagePath - The image path to check
 * @returns True if the image is likely missing
 */
export const isLikelyMissingImage = (imagePath: string): boolean => {
  const missingPatterns = [
    '/assets/cancer-day/2020-himachalpradesh-dhasa',
    '/assets/cancer-day/2024-hima-dhasa',
    '/assets/cancer-day/2025-delhi-aiims'
  ];
  
  return missingPatterns.some(pattern => imagePath.includes(pattern));
};

/**
 * Get alternative file extensions to try for an image
 * @param originalPath - Original image path
 * @returns Array of alternative paths with different extensions
 */
export const getAlternativeExtensions = (originalPath: string): string[] => {
  const basePath = originalPath.substring(0, originalPath.lastIndexOf('.'));
  const currentExt = originalPath.substring(originalPath.lastIndexOf('.')).toLowerCase();
  
  const extensions = ['.jpg', '.jpeg', '.png', '.JPG', '.JPEG', '.PNG'];
  
  return extensions
    .filter(ext => ext.toLowerCase() !== currentExt)
    .map(ext => basePath + ext);
};

/**
 * Generate a descriptive placeholder URL for missing images
 * @param alt - Alt text for the image
 * @param width - Width of placeholder
 * @param height - Height of placeholder
 * @returns Placeholder URL
 */
export const generatePlaceholder = (alt: string, width: number = 400, height: number = 400): string => {
  const text = encodeURIComponent(alt || 'Event Photo');
  return `https://via.placeholder.com/${width}x${height}/e5e7eb/6b7280?text=${text}`;
};

export default {
  getImageFallback,
  isLikelyMissingImage,
  getAlternativeExtensions,
  generatePlaceholder
};