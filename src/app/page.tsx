import { CertificatesSection } from '@/components/CertificateSection'
import { ContactSection } from '@/components/ContactSection'
import HeroSection from '@/components/HeroSection'
import { ProjectsSection } from '@/components/ProjectSection'
import SkillsClock from '@/components/SkillsClock'

export default function Home() {
  return (
    <>
      <HeroSection />
      <SkillsClock />
      <ProjectsSection />
      <CertificatesSection />
      <ContactSection />
    </>
  )
}