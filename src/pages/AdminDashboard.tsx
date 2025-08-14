import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, UserPlus, FileText } from "lucide-react";

const BUSINESS_TITLE = "Time Financial Insurance";

function AdminNavigation({ onSignOut }: { onSignOut: () => void }) {
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
          {/* Navigation Links */}
          <div className="flex items-center space-x-4">
            <Link to="/dashboard">
              <Button variant="nav" className="text-base">
                Home
              </Button>
            </Link>
            <Link to="/admin">
              <Button variant="nav" className="text-base">
                Admin Console
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

const AdminDashboard = () => {
  const [user, setUser] = useState<any>(null);
  const [profile, setProfile] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserAndProfile = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        navigate("/auth");
        return;
      }
      setUser(user);

      // Fetch user profile to check role
      const { data: profileData } = await supabase
        .from('profiles')
        .select("*")
        .eq("user_id", user.id)
        .single();

      if (!profileData || profileData.role !== 'admin') {
        navigate("/dashboard"); // Redirect non-admin users
        return;
      }

      setProfile(profileData);
      setLoading(false);
    };
    fetchUserAndProfile();
  }, [navigate]);

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    navigate("/");
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-lg">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-800 flex flex-col">
      <AdminNavigation onSignOut={handleSignOut} />
      <main className="flex-1 p-8">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-4xl font-bold text-white mb-8">Admin Dashboard</h1>
          
          {/* Admin Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            {/* User Management */}
            <Card className="bg-slate-700 border-slate-600">
              <CardHeader className="text-center pb-6">
                <CardTitle className="text-xl text-slate-300 mb-4">User Management</CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <Button 
                  className="w-full bg-lime-500 hover:bg-lime-600 text-slate-900 font-semibold py-3 px-6 rounded-md transition-colors"
                  onClick={() => {/* TODO: Navigate to user management */}}
                >
                  <Users className="mr-2 h-5 w-5" />
                  Manage Users
                </Button>
              </CardContent>
            </Card>

            {/* Invite Users */}
            <Card className="bg-slate-700 border-slate-600">
              <CardHeader className="text-center pb-6">
                <CardTitle className="text-xl text-slate-300 mb-4">Invite Users</CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <Button 
                  className="w-full bg-lime-500 hover:bg-lime-600 text-slate-900 font-semibold py-3 px-6 rounded-md transition-colors"
                  onClick={() => {/* TODO: Navigate to invitations */}}
                >
                  <UserPlus className="mr-2 h-5 w-5" />
                  Send Invites
                </Button>
              </CardContent>
            </Card>

            {/* Leads Management */}
            <Card className="bg-slate-700 border-slate-600">
              <CardHeader className="text-center pb-6">
                <CardTitle className="text-xl text-slate-300 mb-4">Leads</CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <Button 
                  className="w-full bg-lime-500 hover:bg-lime-600 text-slate-900 font-semibold py-3 px-6 rounded-md transition-colors"
                  onClick={() => {/* TODO: Navigate to leads management */}}
                >
                  <FileText className="mr-2 h-5 w-5" />
                  Manage Leads
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default AdminDashboard;