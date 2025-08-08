import { Button } from "@/components/ui/button";

const Navigation = () => {
  return (
    <nav className="bg-background border-b border-border shadow-[var(--shadow-card)] sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Business Name */}
          <div className="flex-shrink-0">
            <h1 className="text-2xl font-bold text-foreground">
              Time Financial Insurance
            </h1>
          </div>
          
          {/* Navigation Links */}
          <div className="hidden md:flex items-center space-x-8">
            <Button variant="nav" className="text-base">
              Home
            </Button>
            <Button variant="nav" className="text-base">
              Get Quote
            </Button>
          </div>
          
          {/* Login/Sign Up */}
          <div className="flex-shrink-0">
            <Button variant="insurance" className="text-base">
              Login/Sign Up
            </Button>
          </div>
          
          {/* Mobile menu button */}
          <div className="md:hidden">
            <Button variant="ghost" size="icon">
              <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </Button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;