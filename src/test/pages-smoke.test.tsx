import { describe, it, expect } from 'vitest';
import { fireEvent, render, screen, waitFor } from './test-utils';
import { render as rtlRender } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';

import Home from '@/pages/Home';
import About from '@/pages/About';
import ProgramsAndServices from '@/pages/Programs&Services';
import Team from '@/pages/Team';
import Testimonials from '@/pages/Testimonials';
import Donate from '@/pages/Donate';
import Contact from '@/pages/Contact';
import CancerAwarenessCamp from '@/pages/CancerAwarenessCamp';
import AmbulanceServices from '@/pages/AmbulanceServices';
import CommunityKitchen from '@/pages/CommunityKitchen';
import CompassionHome from '@/pages/CompassionHome';
import WorldCancerDay from '@/pages/WorldCancerDay';
import MealsForInvisible from '@/pages/MealsForInvisible';
import Admin from '@/pages/Admin';
import NotFound from '@/pages/NotFound';
import ProgramDetail from '@/components/ProgramDetail';
import {
  mockFetchByUrl,
  mockFooterData,
  mockCancerDayData,
  mockPrograms,
} from './test-utils';

const programsPayload = {
  programs: [
    {
      id: 'world-cancer-day',
      title: 'World Cancer Day',
      shortDescription: 'Global awareness event',
      fullDescription: 'Detailed event information',
      icon: 'Heart',
      image: '/assets/programs/cancer-day.jpg',
      features: ['Awareness'],
      stats: [{ value: '10+', label: 'Years' }],
      contactPerson: 'Coordinator',
      contactEmail: 'events@example.com',
    },
    {
      id: 'cancer-awareness-camp',
      title: 'Cancer Awareness Camp',
      shortDescription: 'Screening and awareness',
      fullDescription: 'Camp details',
      icon: 'Heart',
      image: '/assets/programs/awareness-camp.jpg',
      features: ['Screening'],
      stats: [{ value: '1', label: 'Camp' }],
      contactPerson: 'Coordinator',
      contactEmail: 'camp@example.com',
    },
  ],
};

const testimonialsPayload = {
  testimonials: [
    {
      id: 1,
      name: 'Test Person',
      age: 42,
      diagnosis: 'Recovery Story',
      location: 'Dharamshala',
      image: '/assets/testimonials/test.png',
      quote: 'The support changed my life.',
      date: '2025',
    },
  ],
};

const documentsPayload = {
  documents: [{ image: '/assets/about-images/doc.png', title: 'Certificate' }],
};

const mediaCoveragePayload = {
  media_coverage: [
    {
      media_outlet: 'Test Outlet',
      articles: [
        {
          date: '2025-01-01',
          'cover image': '/assets/media-coverage/test.png',
          article_link: 'https://example.com',
        },
      ],
    },
  ],
};

const cancerCampPayload = {
  id: 'camp-1',
  title: 'Cancer Awareness Camp',
  shortDescription: 'Awareness camp',
  fullDescription: 'Camp details',
  icon: 'Heart',
  image: '/assets/programs/awareness-camp.jpg',
  features: ['Screening'],
  stats: [{ value: '1', label: 'Camp' }],
  contactPerson: 'Doctor',
  contactEmail: 'doctor@example.com',
  healthCamps: [
    {
      id: 'hc-1',
      date: '2025-01-01',
      place: 'Settlement',
      testsOffered: ['CBC'],
      collaborators: [{ name: 'Hospital', logo: '/assets/collaborators/k.png' }],
      settlements: [
        {
          name: 'Settlement A',
          summary: 'Summary',
          genderStats: { male: 10, female: 12 },
          ageGroups: [{ group: '18-30', count: 5 }],
          testResults: [{ category: 'Normal', count: 22 }],
          photos: ['/assets/camps/test.jpg'],
        },
      ],
    },
  ],
};

const ambulancePayload = {
  ambulance_service_provided: [
    {
      Date: '2025-01-01',
      From: 'A',
      To: 'B',
      Trip: 'Hospital transfer',
      Diagnosis: 'General',
      Image: ['/assets/camps/test.jpg'],
    },
  ],
  ambulance_cars: [
    {
      Ambulance1: {
        inauguration_date: '2024-01-01',
        funded_by: 'Donor A',
        venue: 'Delhi',
        event: 'Launch',
        images: ['/assets/camps/test.jpg'],
      },
      Ambulance2: {
        inauguration_date: '2025-01-01',
        funded_by: 'Donor B',
        venue: 'Dharamshala',
        event: 'Launch',
        images: ['/assets/camps/test.jpg'],
      },
    },
  ],
  patient_stories: [
    {
      'Patient Name': 'Patient One',
      Diagnosis: 'Diagnosis',
      Date: '2025-01-01',
      From: 'A',
      To: 'B',
      Trip: 'Transfer',
      Story: 'Patient story',
      Image: ['/assets/camps/test.jpg'],
    },
  ],
};

const communityKitchenPayload = {
  Community_kitchen1: {
    location: 'Delhi',
    inauguration_date: '2021-01-01',
    funded_by: 'Donor',
    total_staff: '10',
    images: ['/assets/community-kitchen/test.jpg'],
  },
  Community_kitchen2: {
    location: 'Dharamshala',
    inauguration_date: '2024-01-01',
    funded_by: 'Donor',
    total_staff: '8',
    images: ['/assets/community-kitchen/test.jpg'],
  },
  purposes: ['Support patients'],
};

const compassionHomePayload = {
  Purpose: ['Support'],
  compassion_home: [
    {
      inauguration_date: '2020-01-01',
      funded_by: 'Donor',
      location: 'Delhi',
      Purpose: ['Safe stay'],
      total_staff: '5',
      images: ['/assets/programs/compassion-home.jpg'],
    },
  ],
  sunday_program: {
    initiated_on: '2022-01-01',
    Purpose: ['Community support'],
    images: ['/assets/programs/compassion-home.jpg'],
  },
};

const mfiPayload = {
  list: [
    {
      'SR.NO': 1,
      DATE: '2025-01-01',
      SPONSOR: 'Sponsor',
      PURPOSE: 'Community meal',
      MEALS_PROVIDED: 100,
    },
  ],
  images: ['/assets/programs/mfi.jpg'],
  videos: {
    topic: 'Meals for Invisible',
    video_links: [
      { id: 'dQw4w9WgXcQ', url: 'https://youtube.com/watch?v=dQw4w9WgXcQ', title: 'Video' },
    ],
  },
};

const teamPayload = [
  {
    id: 1,
    name: 'Team Member',
    role: 'Coordinator',
    message: 'Team message',
    image: '/assets/team-images/test.png',
  },
];

const bankInfoPayload = {
  bankDetails: {
    accountName: 'Tibetan Cancer Society',
    accountNumber: '1234567890',
    bankName: 'Test Bank',
    ifscCode: 'TEST0001',
    branch: 'Dharamshala',
  },
};

describe('Page smoke tests', () => {
  it('renders Home page', async () => {
    mockFetchByUrl(
      {
        '/assets/data/programs.json': programsPayload,
        '/assets/data/testimonials.json': testimonialsPayload,
      },
      mockFooterData
    );

    render(<Home />);
    expect(await screen.findByText('Our Programs & Services')).toBeInTheDocument();
  });

  it('renders About page', async () => {
    mockFetchByUrl(
      {
        '/assets/data/documents.json': documentsPayload,
        '/assets/data/media-coverage.json': mediaCoveragePayload,
      },
      mockFooterData
    );

    render(<About />);
    expect(await screen.findByText('Media Coverage of the Tibetan Cancer Society')).toBeInTheDocument();
  });

  it('renders Programs and Services page with fixed CTA link', async () => {
    mockFetchByUrl(
      {
        '/assets/data/programs.json': programsPayload,
      },
      mockFooterData
    );

    render(<ProgramsAndServices />);
    expect(
      await screen.findByRole('heading', { name: 'Our Programs & Services', level: 1 })
    ).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'Get Support' })).toHaveAttribute('href', '/contact');
  });

  it('renders Cancer Awareness Camp page', async () => {
    mockFetchByUrl(
      {
        '/assets/data/cancer-awareness-camp.json': cancerCampPayload,
      },
      mockFooterData
    );

    render(<CancerAwarenessCamp />);
    expect(
      await screen.findByRole('heading', { name: 'Cancer Awareness Camp', level: 1 })
    ).toBeInTheDocument();
  });

  it('renders Ambulance Services page', async () => {
    mockFetchByUrl(
      {
        '/assets/data/ambulance.json': ambulancePayload,
      },
      mockFooterData
    );

    render(<AmbulanceServices />);
    expect(
      await screen.findByRole('heading', { name: 'Ambulance Services', level: 1 })
    ).toBeInTheDocument();
  });

  it('renders Community Kitchen page', async () => {
    mockFetchByUrl(
      {
        '/assets/data/communitykitchen.json': communityKitchenPayload,
      },
      mockFooterData
    );

    render(<CommunityKitchen />);
    expect(
      await screen.findByRole('heading', { name: 'Community Kitchen', level: 1 })
    ).toBeInTheDocument();
  });

  it('renders Compassion Home page and toggles Sunday Program tab', async () => {
    mockFetchByUrl(
      {
        '/assets/data/compassionhome.json': compassionHomePayload,
      },
      mockFooterData
    );

    render(<CompassionHome />);
    expect(
      await screen.findByRole('heading', { name: 'Compassion Home', level: 1 })
    ).toBeInTheDocument();

    fireEvent.click(screen.getByRole('button', { name: /Sunday Program/i }));
    expect(await screen.findByRole('heading', { name: 'Sunday Program' })).toBeInTheDocument();
  });

  it('renders World Cancer Day page', async () => {
    mockFetchByUrl(
      {
        '/assets/data/cancerday.json': mockCancerDayData,
      },
      mockFooterData
    );

    render(<WorldCancerDay />);
    expect(await screen.findByRole('heading', { name: 'World Cancer Day', level: 1 })).toBeInTheDocument();
  });

  it('renders Meals for Invisible and switches tabs', async () => {
    mockFetchByUrl(
      {
        '/assets/data/MFI.json': mfiPayload,
      },
      mockFooterData
    );

    render(<MealsForInvisible />);
    expect(
      await screen.findByRole('heading', { name: 'Meals for Invisible', level: 1 })
    ).toBeInTheDocument();

    fireEvent.click(screen.getByRole('button', { name: /Meals Served/i }));
    expect(await screen.findByText('Meal Service Records')).toBeInTheDocument();
  });

  it('renders Team page and opens member modal', async () => {
    mockFetchByUrl(
      {
        '/assets/data/teammembers.json': teamPayload,
      },
      mockFooterData
    );

    render(<Team />);
    expect(await screen.findByText('Team Member')).toBeInTheDocument();

    fireEvent.click(screen.getByText('Team Member'));
    expect(await screen.findByText('Coordinator')).toBeInTheDocument();
  });

  it('renders Testimonials page and opens detail modal', async () => {
    mockFetchByUrl(
      {
        '/assets/data/testimonials.json': testimonialsPayload,
      },
      mockFooterData
    );

    render(<Testimonials />);
    expect(await screen.findByText('Patient Testimonials')).toBeInTheDocument();

    fireEvent.click(screen.getByText('Test Person'));
    expect(await screen.findByLabelText('Close')).toBeInTheDocument();
  });

  it('renders Donate page with bank details', async () => {
    mockFetchByUrl(
      {
        '/assets/data/bankinfo.json': bankInfoPayload,
      },
      mockFooterData
    );

    render(<Donate />);
    expect(await screen.findByText('Bank Account Details')).toBeInTheDocument();
  });

  it('renders Contact page', async () => {
    mockFetchByUrl({}, mockFooterData);

    render(<Contact />);
    expect(await screen.findByText('Contact Us')).toBeInTheDocument();
  });

  it('renders Admin login page', async () => {
    mockFetchByUrl({}, mockFooterData);
    render(<Admin />);
    expect(screen.getByText('Username')).toBeInTheDocument();
    expect(screen.getByText('Password')).toBeInTheDocument();
  });

  it('renders NotFound page', async () => {
    rtlRender(
      <MemoryRouter initialEntries={['/missing-page']}>
        <Routes>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </MemoryRouter>
    );

    expect(screen.getByText('404')).toBeInTheDocument();
  });

  it('renders ProgramDetail using route param id', async () => {
    mockFetchByUrl({}, mockFooterData);

    rtlRender(
      <MemoryRouter initialEntries={['/programs/1']}>
        <Routes>
          <Route path="/programs/:id" element={<ProgramDetail programs={mockPrograms} />} />
        </Routes>
      </MemoryRouter>
    );

    await waitFor(() => {
      expect(screen.getByText('Cancer Awareness Camp')).toBeInTheDocument();
    });
  });
});
