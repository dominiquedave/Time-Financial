import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
//import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { createClient } from '@supabase/supabase-js'
import { 
  Users, 
  FileText, 
  TrendingUp, 
  AlertCircle,
  ChevronRight,
  Activity
} from "lucide-react";
import { format } from 'date-fns';
import { LeadsTableView } from "@/components/LeadsTableView";
import { LeadsDetailSheet } from "@/components/LeadsDetailSheet";
import { UsersTableView } from "@/components/UsersTableView";

const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL,
  import.meta.env.VITE_SUPABASE_ANON_KEY
)

const AdminDashboard = () => {
  const [user, setUser] = useState<any>(null);
  const [userProfile, setUserProfile] = useState<any>(null);
  const [allLeads, setAllLeads] = useState<any[]>([]);
  const [allUsers, setAllUsers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [isLeadsTableOpen, setIsLeadsTableOpen] = useState(false);
  const [selectedLead, setSelectedLead] = useState<any>(null);
  const [isLeadDetailOpen, setIsLeadDetailOpen] = useState(false);
  const [filteredLeads, setFilteredLeads] = useState<any[]>([]);
  const [tableTitle, setTableTitle] = useState("All Leads");
  const [isUsersTableOpen, setIsUsersTableOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const checkAdminAccess = async () => {
      try {
        const { data: { user } } = await supabase.auth.getUser();
        if (!user) {
          navigate("/auth");
          return;
        }
        setUser(user);

        // Check role from user metadata
        const userRole = user.user_metadata.role;
        if (userRole !== 'admin') {
          navigate("/dashboard");
          return;
        }

        // console log current users auth.jwt()
        console.log("Current User JWT:", user);

        // Fetch data needed for admin dashboard
        const profilesResponse = await supabase.from('profiles').select('*');
        setAllUsers(profilesResponse.data || []);
        
        const { data: leads } = await supabase
          .from('leads')
          .select('*')
          .order('created_at', { ascending: false });
        
        setAllLeads(leads || []);
      } catch (error) {
        console.error('Error checking admin access:', error);
        navigate("/dashboard");
      } finally {
        setLoading(false);
      }
    };

    checkAdminAccess();
  }, [navigate]);

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    navigate("/");
  };

  const handleLeadClick = (lead: any) => {
    setSelectedLead(lead);
    setIsLeadDetailOpen(true);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <Activity className="w-8 h-8 animate-spin mx-auto mb-4 text-primary" />
          <p className="text-muted-foreground">Loading admin dashboard...</p>
        </div>
      </div>
    );
  }

  const getTodayLeads = () => {
    const today = new Date().setHours(0, 0, 0, 0);
    return allLeads.filter(lead => {
      const leadDate = new Date(lead.created_at).setHours(0, 0, 0, 0);
      return leadDate === today;
    }).length;
  };

  const getPendingLeads = () => {
    return allLeads.filter(lead => lead.status === 'new').length;
  };

  const stats = [
    {
      title: "Total Users",
      value: allUsers.length,
      icon: Users,
      color: "bg-primary",
      description: "Registered users",
      onClick: () => setIsUsersTableOpen(true)
    },
    {
      title: "Total Leads",
      value: allLeads.length,
      icon: FileText,
      color: "bg-accent",
      description: "All leads in system",
      onClick: () => setIsLeadsTableOpen(true)
    },
    {
      title: "New Leads Today",
      value: getTodayLeads(),
      icon: TrendingUp,
      color: "bg-primary",
      description: "Leads created today",
      onClick: () => {
        const today = new Date().setHours(0, 0, 0, 0);
        const todayLeads = allLeads.filter(lead => {
          const leadDate = new Date(lead.created_at).setHours(0, 0, 0, 0);
          return leadDate === today;
        });
        setFilteredLeads(todayLeads);
        setTableTitle("New Leads Today");
        setIsLeadsTableOpen(true);
      }
    },
    {
      title: "Pending Leads",
      value: getPendingLeads(),
      icon: AlertCircle,
      color: "bg-accent",
      description: "Require attention",
      onClick: () => {
        const pendingLeads = allLeads.filter(lead => lead.status === 'new');
        setFilteredLeads(pendingLeads);
        setTableTitle("Pending Leads");
        setIsLeadsTableOpen(true);
      }
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-card border-b border-border shadow-[var(--shadow-card)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-4">
              <h1 className="text-2xl font-bold text-foreground">
                Time Financial Insurance
              </h1>
              <Badge variant="secondary" className="bg-primary text-primary-foreground">
                Admin Dashboard
              </Badge>
            </div>
            <div className="flex items-center space-x-4">
              <Button 
                variant="outline" 
                onClick={() => navigate("/dashboard")}
                className="border-border hover:bg-muted"
              >
                User Dashboard
              </Button>
              <Button 
                variant="destructive" 
                onClick={handleSignOut}
              >
                Sign Out
              </Button>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-foreground mb-2">
            Welcome back, {userProfile?.first_name || user?.email}
          </h2>
          <p className="text-muted-foreground">
            Here's what's happening with your business today.
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => (
            <Card 
              key={index} 
              className={`border-border shadow-[var(--shadow-card)] ${stat.onClick ? 'cursor-pointer hover:bg-muted/50' : ''}`}
              onClick={stat.onClick}
            >
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground mb-1">
                      {stat.title}
                    </p>
                    <p className="text-3xl font-bold text-foreground">
                      {stat.value}
                    </p>
                    <p className="text-xs text-muted-foreground mt-1">
                      {stat.description}
                    </p>
                  </div>
                  <div className={`p-3 rounded-lg ${stat.color}`}>
                    <stat.icon className="w-6 h-6 text-white" />
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Recent Activity Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Recent Leads */}
          <Card className="border-border shadow-[var(--shadow-card)]">
            <CardHeader className="pb-4">
              <div className="flex items-center justify-between">
                <CardTitle className="text-foreground">Recent Leads</CardTitle>
                <ChevronRight className="w-5 h-5 text-muted-foreground" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {allLeads.slice(0, 5).map((lead) => (
                  <div 
                    key={lead.id} 
                    className="flex items-center justify-between p-3 bg-muted/50 rounded-lg hover:bg-muted cursor-pointer transition-colors"
                    onClick={() => handleLeadClick(lead)}
                    role="button"
                    tabIndex={0}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' || e.key === ' ') {
                        handleLeadClick(lead);
                      }
                    }}
                  >
                    <div>
                      <p className="font-medium text-foreground">
                        {[lead.first_name, lead.last_name].filter(Boolean).join(' ')}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        {format(new Date(lead.created_at), 'MMM dd, yyyy')}
                      </p>
                    </div>
                    <Badge 
                      variant={lead.status === 'new' ? 'default' : 'secondary'}
                      className={lead.status === 'new' ? 'bg-primary text-primary-foreground' : ''}
                    >
                      {lead.status || 'new'}
                    </Badge>
                  </div>
                ))}
                {allLeads.length === 0 && (
                  <p className="text-center text-muted-foreground py-4">
                    No leads found
                  </p>
                )}
              </div>
            </CardContent>
          </Card>

          {/* User Management */}
          <Card className="border-border shadow-[var(--shadow-card)]">
            <CardHeader className="pb-4">
              <div className="flex items-center justify-between">
                <CardTitle className="text-foreground">Recent Users</CardTitle>
                <ChevronRight className="w-5 h-5 text-muted-foreground" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {allUsers.slice(0, 5).map((userProfile) => (
                  <div key={userProfile.id} className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                    <div>
                      <p className="font-medium text-foreground">
                        {userProfile.first_name} {userProfile.last_name}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        {new Date(userProfile.created_at).toLocaleDateString()}
                      </p>
                    </div>
                    <Badge 
                      variant={(userProfile as any).role === 'admin' ? 'default' : 'secondary'}
                      className={(userProfile as any).role === 'admin' ? 'bg-primary text-primary-foreground' : ''}
                    >
                      {(userProfile as any).role || 'user'}
                    </Badge>
                  </div>
                ))}
                {allUsers.length === 0 && (
                  <p className="text-center text-muted-foreground py-4">
                    No users found
                  </p>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </main>

      <LeadsTableView
        leads={filteredLeads.length > 0 ? filteredLeads : allLeads}
        isOpen={isLeadsTableOpen}
        onClose={() => {
          setIsLeadsTableOpen(false);
          setFilteredLeads([]);
          setTableTitle("All Leads");
        }}
        onLeadClick={handleLeadClick}
        title={tableTitle}
      />
      
      <LeadsDetailSheet
        lead={selectedLead}
        isOpen={isLeadDetailOpen}
        onClose={() => setIsLeadDetailOpen(false)}
      />

      <UsersTableView
        users={allUsers}
        isOpen={isUsersTableOpen}
        onClose={() => setIsUsersTableOpen(false)}
      />
    </div>
  );
};

export default AdminDashboard;