const HeroSection = () => {
  return (
    <section className="relative py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-[hsl(var(--insurance-light))] to-[hsl(var(--secondary))]">
      <div className="max-w-4xl mx-auto text-center">
        <div className="mb-8">
          <span className="inline-block px-4 py-2 bg-[hsl(var(--insurance-lime))] text-white text-sm font-semibold rounded-full mb-6">
            Open Enrollment
          </span>
          <h1 className="text-4xl md:text-6xl font-bold text-foreground mb-6 leading-tight">
            Affordable Care Act
            <br />
            <span className="text-[hsl(var(--insurance-lime))]">Enrollment Periods</span>
          </h1>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto leading-relaxed">
            Get comprehensive health insurance coverage that fits your needs and budget. 
            Don't miss your chance to enroll during the open enrollment period.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
          <div className="bg-card p-6 rounded-lg shadow-[var(--shadow-card)] border border-border">
            <div className="w-12 h-12 bg-[hsl(var(--insurance-lime))] rounded-lg flex items-center justify-center mb-4 mx-auto">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-foreground mb-2">Easy Enrollment</h3>
            <p className="text-muted-foreground text-sm">Simple application process with expert guidance every step of the way.</p>
          </div>
          
          <div className="bg-card p-6 rounded-lg shadow-[var(--shadow-card)] border border-border">
            <div className="w-12 h-12 bg-[hsl(var(--insurance-lime))] rounded-lg flex items-center justify-center mb-4 mx-auto">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-foreground mb-2">Affordable Plans</h3>
            <p className="text-muted-foreground text-sm">Find coverage that fits your budget with subsidies and tax credits available.</p>
          </div>
          
          <div className="bg-card p-6 rounded-lg shadow-[var(--shadow-card)] border border-border">
            <div className="w-12 h-12 bg-[hsl(var(--insurance-lime))] rounded-lg flex items-center justify-center mb-4 mx-auto">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-foreground mb-2">Quality Care</h3>
            <p className="text-muted-foreground text-sm">Access to quality healthcare providers and comprehensive coverage options.</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;