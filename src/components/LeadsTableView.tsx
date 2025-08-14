import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { format } from "date-fns";

interface Lead {
  id: string;
  first_name?: string;
  last_name?: string;
  email?: string;
  phone?: string;
  state?: string;
  status?: string;
  created_at: string;
}

interface LeadsTableViewProps {
  leads: Lead[];
  isOpen: boolean;
  onClose: () => void;
  onLeadClick: (lead: Lead) => void;
  title: string;
}

export function LeadsTableView({ leads, isOpen, onClose, onLeadClick, title }: LeadsTableViewProps) {
  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent side="right" className="w-full sm:w-[900px] bg-background overflow-y-auto">
        <SheetHeader className="pb-6">
          <SheetTitle className="text-2xl font-bold flex items-center justify-between">
            {title}
            <Badge variant="secondary" className="ml-2">
              {leads.length} {leads.length === 1 ? 'lead' : 'leads'}
            </Badge>
          </SheetTitle>
        </SheetHeader>

        <div className="relative">
          <Table>
            <TableHeader className="sticky top-0 bg-background">
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Phone</TableHead>
                <TableHead>State</TableHead>
                <TableHead>Created</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {leads.map((lead) => (
                <TableRow
                  key={lead.id}
                  className="cursor-pointer hover:bg-muted/50"
                  onClick={() => onLeadClick(lead)}
                >
                  <TableCell className="font-medium">
                    {[lead.first_name, lead.last_name].filter(Boolean).join(' ')}
                  </TableCell>
                  <TableCell>
                    <Badge 
                      variant={lead.status === 'new' ? 'default' : 'secondary'}
                      className={lead.status === 'new' ? 'bg-primary text-primary-foreground' : ''}
                    >
                      {lead.status || 'new'}
                    </Badge>
                  </TableCell>
                  <TableCell>{lead.email || 'N/A'}</TableCell>
                  <TableCell>{lead.phone || 'N/A'}</TableCell>
                  <TableCell>{lead.state || 'N/A'}</TableCell>
                  <TableCell>
                    {format(new Date(lead.created_at), 'MMM dd, yyyy')}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </SheetContent>
    </Sheet>
  );
}