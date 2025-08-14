import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useNavigate, Link } from "react-router-dom";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import ContactForm from "@/components/ContactForm";

const BUSINESS_TITLE = "Time Financial Insurance";

function DashboardNavigation({ onSignOut }: { onSignOut: () => void }) {
  return (
    <nav className="bg-background border-b border-border shadow-[var(--shadow-card)] sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Business Name */}
          <div className="flex-shrink-0">
            <h1 className="text-2xl font-bold text-foreground">
              {BUSINESS_TITLE}
            </h1>
          </div>
          {/* Centered Home Link */}
          <div className="flex-1 flex justify-center">
            <Link to="/dashboard">
              <Button variant="nav" className="text-base">
                Home
              </Button>
            </Link>
          </div>
          {/* Sign Out Button */}
          <div className="flex-shrink-0">
            <Button
              variant="insurance"
              className="text-base"
              onClick={onSignOut}
            >
              Sign Out
            </Button>
          </div>
        </div>
      </div>
    </nav>
  );
}

const Dashboard = () => {
  const [user, setUser] = useState<any>(null);
  const [leads, setLeads] = useState<any[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserAndLeads = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        navigate("/"); // redirect if not logged in
        return;
      }
      setUser(user);
      // Check for authenticated user
      // const { data: user } = await supabase.auth.getUser()
      // console.log('Authenticated user:', user.id) 

    //   const { data } = await supabase
    //     .from("leads")
    //     .select("*")
    //     .eq("user_id", user.id);

    //   setLeads(data || []);
    };
    fetchUserAndLeads();
  }, [navigate]);

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <DashboardNavigation onSignOut={handleSignOut} />
      <main className="flex-1 flex flex-col items-center justify-center px-4">
        {/* Hero-style welcome */}
        <section className="w-full max-w-3xl text-center py-12">
          <h1 className="text-4xl font-extrabold text-foreground mb-4">
            Welcome{user?.user_metadata?.full_name ? `, ${user.user_metadata.full_name}` : ""}!
          </h1>
          <p className="text-lg text-muted-foreground mb-8">
            Here are your current leads. Manage your business efficiently with Time Financial Insurance CRM.
          </p>
        </section>
        {/* Leads Section */}
        <section className="w-full max-w-3xl mb-12">
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-2xl font-semibold mb-4">Your Leads</h2>
            {leads.length === 0 ? (
              <p className="text-muted-foreground">No leads yet.</p>
            ) : (
              <ul className="space-y-3">
                {leads.map((lead) => (
                  <li key={lead.id} className="p-4 border rounded-lg flex flex-col md:flex-row md:items-center md:justify-between bg-background">
                    <div>
                      <span className="font-medium text-lg">{lead.name}</span>
                      <div className="text-sm text-muted-foreground">{lead.email}</div>
                    </div>
                    {/* Add more lead details/actions here if needed */}
                  </li>
                ))}
              </ul>
            )}
          </div>
        </section>
        {/* Contact Form Section */}
        <ContactForm />
      </main>
      <Footer />
    </div>
  );
};

export default Dashboard;
