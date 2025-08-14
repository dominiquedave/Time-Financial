import Navigation from "@/components/Navigation";
import HeroSection from "@/components/HeroSection";
import SpecialEnrollmentSection from "@/components/SpecialEnrollmentSection";
import ContactForm from "@/components/ContactForm";
import Footer from "@/components/Footer";

const Index = () => {
  const scrollToContact = () => {
    document.getElementById('contact-section')?.scrollIntoView({ behavior: 'smooth' });
  };

  const scrollToHero = () => {
    document.getElementById('hero-section')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation onGetQuoteClick={scrollToContact} onHomeClick={scrollToHero} />
      <div id="hero-section">
        <HeroSection />
      </div>
      <SpecialEnrollmentSection />
      <div id="contact-section">
        <ContactForm />
      </div>
      <Footer />
    </div>
  );
};

export default Index;
