import React, { useState, useEffect } from 'react';
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import About from "./pages/About";
import ProgramsAndServices from "./pages/Programs&Services";
import Team from "./pages/Team";
import Donate from "./pages/Donate";
import Testimonials from "./pages/Testimonials";
import Admin from "./pages/Admin";
import NotFound from "./pages/NotFound";
import ProgramDetail from "./components/ProgramDetail";
import Contact from "./pages/Contact";
import CancerAwarenessCamp from './pages/CancerAwarenessCamp';
import AmbulanceServices from './pages/AmbulanceServices';
import CommunityKitchen from './pages/CommunityKitchen';
import CompassionHome from './pages/CompassionHome';
import WorldCancerDay from './pages/WorldCancerDay';

const queryClient = new QueryClient();

interface Program {
  id: string;
  title: string;
  shortDescription: string;
  fullDescription: string;
  icon: string;
  image: string;
  features: string[];
  stats: Array<{
    value: string;
    label: string;
  }>;
  contactPerson: string;
  contactEmail: string;
}

const App = () => {
  const [programs, setPrograms] = useState<Program[]>([]);

  useEffect(() => {
    const fetchPrograms = async () => {
      try {
        const response = await fetch('/assets/data/programs.json');
        if (response.ok) {
          const data = await response.json();
          setPrograms(data.programs);
        }
      } catch (error) {
        console.error("Failed to fetch programs:", error);
      }
    };

    fetchPrograms();
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <TooltipProvider>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/programs-services" element={<ProgramsAndServices />} />
            <Route path="/programs/cancer-awareness-camp" element={<CancerAwarenessCamp />} />
            <Route path="/programs/ambulance-services" element={<AmbulanceServices />} />
            <Route path="/programs/community-kitchen" element={<CommunityKitchen />} />
            <Route path="/programs/compassion-home" element={<CompassionHome />} />
            <Route path="/programs/world-cancer-day" element={<WorldCancerDay />} />
            <Route path="/program/:id" element={<ProgramDetail programs={programs} />} />
            <Route path="/programs/:id" element={<ProgramDetail programs={programs} />} />
            <Route path="/team" element={<Team />} />
            <Route path="/donate" element={<Donate />} />
            <Route path="/testimonials" element={<Testimonials />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/admin" element={<Admin />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
          <Toaster />
          <Sonner />
        </TooltipProvider>
      </BrowserRouter>
    </QueryClientProvider>
  );
}

export default App;
