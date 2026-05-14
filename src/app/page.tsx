import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Experience from "@/components/Experience";
import CaseStudies from "@/components/CaseStudies";
import Skills from "@/components/Skills";
import SystemDesign from "@/components/SystemDesign";
import GithubSection from "@/components/GithubSection";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main className="relative">
      <Nav />
      <Hero />
      <About />
      <Experience />
      <CaseStudies />
      <Skills />
      <SystemDesign />
      <GithubSection />
      <Footer />
    </main>
  );
}
