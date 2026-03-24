import HeroSection from '@/components/HeroSection'
import SkillsClock from '@/components/SkillsClock'
import { ProjectsSection } from '@/components/ProjectSection'
import { CertificatesSection } from '@/components/CertificateSection'
import { ContactSection } from '@/components/ContactSection'
import { StarField } from '@/components/StarField'

export default function Home() {
  return (
    <main className="relative min-h-screen overflow-hidden">
      {/* Background */}
      <StarField />

      <div className="fixed inset-0 bg-gradient-to-b from-black/30 to-black/80 z-[1]" />

      {/* Content */}
      <div className="relative z-10">
        <HeroSection />
        <SkillsClock />
        <ProjectsSection />
        <CertificatesSection />
        <ContactSection />
      </div>
    </main>
  )
}