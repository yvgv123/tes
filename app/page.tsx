import Navbar from '@/components/Navbar';
import HeroDashboard from '@/components/HeroDashboard';
import OperatorDossier from '@/components/OperatorDossier';
import ProjectsSection from '@/components/ProjectsSection';
import Footer from '@/components/Footer';

export default function Home() {
  return (
    <>
      <Navbar />
      <HeroDashboard />
      <OperatorDossier />
      <ProjectsSection />
      <Footer />
    </>
  );
}
