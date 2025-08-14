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

interface UserProfile {
  id: string;
  user_id: string;
  first_name?: string;
  last_name?: string;
  role?: string;
  created_at: string;
}

interface UsersTableViewProps {
  users: UserProfile[];
  isOpen: boolean;
  onClose: () => void;
}

export function UsersTableView({ users, isOpen, onClose }: UsersTableViewProps) {
  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent side="right" className="w-full sm:w-[900px] bg-background overflow-y-auto">
        <SheetHeader className="pb-6">
          <SheetTitle className="text-2xl font-bold flex items-center justify-between">
            Registered Users
            <Badge variant="secondary" className="ml-2">
              {users.length} total
            </Badge>
          </SheetTitle>
        </SheetHeader>

        <div className="relative">
          <Table>
            <TableHeader className="sticky top-0 bg-background">
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Role</TableHead>
                <TableHead>User ID</TableHead>
                <TableHead>Created</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {users.map((user) => (
                <TableRow key={user.id}>
                  <TableCell className="font-medium">
                    {[user.first_name, user.last_name].filter(Boolean).join(' ')}
                  </TableCell>
                  <TableCell>
                    <Badge 
                      variant={user.role === 'admin' ? 'default' : 'secondary'}
                      className={user.role === 'admin' ? 'bg-primary text-primary-foreground' : ''}
                    >
                      {user.role || 'user'}
                    </Badge>
                  </TableCell>
                  <TableCell className="font-mono text-sm">
                    {user.user_id}
                  </TableCell>
                  <TableCell>
                    {format(new Date(user.created_at), 'MMM dd, yyyy')}
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