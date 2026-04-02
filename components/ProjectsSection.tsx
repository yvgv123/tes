'use client';

import { useState } from 'react';
import FolderStack from './FolderStack';
import DossierModal from './DossierModal';
import { type Project } from '@/lib/projectsData';

export default function ProjectsSection() {
  const [modalProject, setModalProject] = useState<Project | null>(null);
  const [isModalOpen,  setIsModalOpen]  = useState(false);

  function handleOpenModal(project: Project) {
    setModalProject(project);
    setIsModalOpen(true);
  }

  function handleCloseModal() {
    setIsModalOpen(false);
  }

  return (
    <>
      <FolderStack onOpenModal={handleOpenModal} />
      <DossierModal isOpen={isModalOpen} project={modalProject} onClose={handleCloseModal} />
    </>
  );
}
