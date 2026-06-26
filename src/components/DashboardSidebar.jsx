import { getUserSession } from "@/lib/core/session";
import {LayoutSideContentLeft, Plus, Envelope, Gear, House, Briefcase, Magnifier, Bookmark, FileText, CreditCard, Person, } from "@gravity-ui/icons";
import {Button, Drawer} from "@heroui/react";
import { BookOpenText, Building, CreditCardIcon, HistoryIcon, NewspaperIcon, Users } from "lucide-react";
import Link from "next/link";

export async function DashboardSidebar() {
   const user=await getUserSession();
 
  const writerNavItems = [
    {icon: House, label: "Home" ,href:"/dashboard/writer"},
    {icon: BookOpenText, label: "Manage Ebooks", href: "/dashboard/writer/books"},
    {icon: Plus, label: "Add Ebook" ,href: "/dashboard/writer/books/new"},
    {icon: Bookmark, label: "Bookmark Page" ,href: "/dashboard/writer/bookmark"},
    {icon: CreditCard, label: "Sales History",href: "/dashboard/writer/sales"},
    
  ];
  const readerNavItems = [
    {icon: House, label: "Home" ,href:"/dashboard/reader"},
    {icon:BookOpenText, label: "Purchase Books" ,href: "/dashboard/reader/purchaseBook"},
    {icon: HistoryIcon, label: "Purchase History", href: "/dashboard/reader/purchaseHistory"},
    {icon: Bookmark, label: "Bookmark Page" ,href: "/dashboard/reader/bookmark"},
    {icon: Person, label: "Profile Management",href: "/dashboard/reader/profile"},
    
  ];
  const adminNavItems = [
    {icon: House, label: "Home" ,href:"/dashboard/admin"},
    {icon:Users, label: "Users" ,href: "/dashboard/admin/users"},
    {icon: BookOpenText, label: "Manage All Books", href: "/dashboard/admin/managebooks"},
    {icon: CreditCardIcon, label: "View All Transactions" ,href: "/dashboard/admin/transactions"},
   
    
  ];

   const navLinksMap={
    writer:writerNavItems,
    reader:readerNavItems,
    admin:adminNavItems,
  }
  const navItems=navLinksMap[user?.role || 'reader'];

  

  return (
    <div>
        {/* large device */}
        <aside className="hidden md:block w-64 shrink-0 border-r border-default p-4">
             <nav className="flex flex-col gap-1">
                {navItems.map((item) => (
                  <Link href={item.href}  key={item.label}>
                  <button
                    className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm text-foreground transition-colors hover:bg-default"
                    type="button"
                  >
                    <item.icon className="size-5 text-muted" />
                    {item.label}
                  </button>
                  </Link>
                ))}
              </nav>
        </aside>


      {/* small device */}
        <Drawer>
      <Button  className="md:hidden" variant="secondary">
        <LayoutSideContentLeft />
        Sidebar
      </Button>
      <Drawer.Backdrop>
        <Drawer.Content placement="left">
          <Drawer.Dialog>
            <Drawer.CloseTrigger />
            <Drawer.Header>
              <Drawer.Heading>Sidebar</Drawer.Heading>
            </Drawer.Header>
            <Drawer.Body>
              <nav className="flex flex-col gap-1">
                {navItems.map((item) => (
                  <Link href={item.href}  key={item.label}><button
                   className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm text-foreground transition-colors hover:bg-default"
                    type="button"
                  >
                    <item.icon className="size-5 text-muted" />
                    {item.label}
                  </button></Link>
                ))}
              </nav>
            </Drawer.Body>
          </Drawer.Dialog>
        </Drawer.Content>
      </Drawer.Backdrop>
    </Drawer>
    </div>
    
  );
}