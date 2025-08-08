import Navigation from "@/components/Navigation";
import HeroSection from "@/components/HeroSection";
import SpecialEnrollmentSection from "@/components/SpecialEnrollmentSection";
import ContactForm from "@/components/ContactForm";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <HeroSection />
      <SpecialEnrollmentSection />
      <ContactForm />
      <Footer />
    </div>
  );
};

export default Index;
