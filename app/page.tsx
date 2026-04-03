'use client';

import { OutlineColorProvider } from '@/lib/OutlineColorContext';
import Navbar from '@/components/Navbar';
import HeroDashboard from '@/components/HeroDashboard';
import OperatorDossier from '@/components/OperatorDossier';
import ProjectsSection from '@/components/ProjectsSection';
import Footer from '@/components/Footer';
import LoadingScreen from '@/components/LoadingScreen';

export default function Home() {
  return (
    <OutlineColorProvider>
      <LoadingScreen />
      <Navbar />
      <HeroDashboard />
      <OperatorDossier />
      <ProjectsSection />
      <Footer />
    </OutlineColorProvider>
  );
}
