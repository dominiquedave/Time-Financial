import { format } from "date-fns";
import { Badge } from "@/components/ui/badge";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";

interface Lead {
  id: string;
  first_name?: string;
  last_name?: string;
  email?: string;
  phone?: string;
  state?: string;
  status?: string;
  zip_code?: string;
  address?: string;
  ssn?: string;
  date_of_birth?: string;
  created_at: string;
  updated_at: string;
  owner_id?: string;
  user_id?: string;
}

interface LeadsDetailSheetProps {
  lead: Lead | null;
  isOpen: boolean;
  onClose: () => void;
}

export function LeadsDetailSheet({ lead, isOpen, onClose }: LeadsDetailSheetProps) {
  if (!lead) return null;

  const getStatusColor = (status?: string) => {
    switch (status?.toLowerCase()) {
      case 'new':
        return 'bg-[#9AE652] text-black';
      case 'contacted':
        return 'bg-blue-500 text-white';
      case 'qualified':
        return 'bg-yellow-500 text-black';
      case 'closed':
        return 'bg-green-600 text-white';
      default:
        return 'bg-gray-500 text-white';
    }
  };

  const fullName = [lead.first_name, lead.last_name].filter(Boolean).join(' ') || 'N/A';

  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent side="right" className="w-[400px] sm:w-[540px] bg-white border-r border-border">
        <SheetHeader className="pb-6">
          <div className="flex items-center justify-between">
            <SheetTitle className="text-xl font-bold text-black">
              Lead #{lead.id.slice(0, 8)}
            </SheetTitle>
            <Badge className={`${getStatusColor(lead.status)} font-medium`}>
              Status: {lead.status || 'New'}
            </Badge>
          </div>
          <div className="text-sm text-gray-600">
            <div>Owner: {lead.owner_id ? 'Assigned' : 'Unassigned'}</div>
            <div>Created: {format(new Date(lead.created_at), 'MMM dd, yyyy')}</div>
          </div>
        </SheetHeader>

        <div className="space-y-6">
          <div className="grid grid-cols-1 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-semibold text-black">Name</label>
              <div className="text-base text-gray-800">{fullName}</div>
            </div>

            {lead.date_of_birth && (
              <div className="space-y-2">
                <label className="text-sm font-semibold text-black">DOB</label>
                <div className="text-base text-gray-800">
                  {format(new Date(lead.date_of_birth), 'MM/dd/yyyy')}
                </div>
              </div>
            )}

            <div className="space-y-2">
              <label className="text-sm font-semibold text-black">Phone</label>
              <div className="text-base text-gray-800">{lead.phone || 'N/A'}</div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-semibold text-black">Email</label>
              <div className="text-base text-gray-800">{lead.email || 'N/A'}</div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-semibold text-black">Address</label>
              <div className="text-base text-gray-800">{lead.address || 'N/A'}</div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-semibold text-black">State</label>
              <div className="text-base text-gray-800">{lead.state || 'N/A'}</div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-semibold text-black">Zip Code</label>
              <div className="text-base text-gray-800">{lead.zip_code || 'N/A'}</div>
            </div>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}