import specialEnrollmentBg from "@/assets/special-enrollment-bg.jpg";

const SpecialEnrollmentSection = () => {
  return (
    <section 
      className="relative py-20 px-4 sm:px-6 lg:px-8 bg-cover bg-center bg-no-repeat"
      style={{ 
        backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)), url(${specialEnrollmentBg})` 
      }}
    >
      <div className="max-w-4xl mx-auto text-center">
        <div className="mb-8">
          <span className="inline-block px-4 py-2 bg-[hsl(var(--insurance-lime))] text-white text-sm font-semibold rounded-full mb-6">
            Special Opportunity
          </span>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 leading-tight">
            Special Enrollment Period
          </h2>
          <p className="text-xl text-gray-200 mb-8 max-w-2xl mx-auto leading-relaxed">
            Qualifying life events may make you eligible for a Special Enrollment Period, 
            allowing you to enroll in health insurance outside of the regular open enrollment window.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-12">
          <div className="bg-white/10 backdrop-blur-sm p-6 rounded-lg border border-white/20">
            <div className="w-12 h-12 bg-[hsl(var(--insurance-lime))] rounded-lg flex items-center justify-center mb-4 mx-auto">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-white mb-2">Marriage</h3>
            <p className="text-gray-200 text-sm">Getting married or divorced qualifies you for special enrollment.</p>
          </div>
          
          <div className="bg-white/10 backdrop-blur-sm p-6 rounded-lg border border-white/20">
            <div className="w-12 h-12 bg-[hsl(var(--insurance-lime))] rounded-lg flex items-center justify-center mb-4 mx-auto">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-white mb-2">Moving</h3>
            <p className="text-gray-200 text-sm">Relocating to a new area opens a special enrollment window.</p>
          </div>
          
          <div className="bg-white/10 backdrop-blur-sm p-6 rounded-lg border border-white/20">
            <div className="w-12 h-12 bg-[hsl(var(--insurance-lime))] rounded-lg flex items-center justify-center mb-4 mx-auto">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2-2v2m8 0V6a2 2 0 012 2v6a2 2 0 01-2 2H8a2 2 0 01-2-2V8a2 2 0 012-2V6" />
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-white mb-2">Job Changes</h3>
            <p className="text-gray-200 text-sm">Starting or losing a job affects your enrollment eligibility.</p>
          </div>
          
          <div className="bg-white/10 backdrop-blur-sm p-6 rounded-lg border border-white/20">
            <div className="w-12 h-12 bg-[hsl(var(--insurance-lime))] rounded-lg flex items-center justify-center mb-4 mx-auto">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-white mb-2">New Baby</h3>
            <p className="text-gray-200 text-sm">Birth or adoption creates a special enrollment opportunity.</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SpecialEnrollmentSection;