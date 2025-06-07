
import { NavLink, useLocation } from "react-router-dom";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";
import { 
  Search, 
  Calendar, 
  Grid3x3, 
  User, 
  MapPin,
  FileText,
  Settings
} from "lucide-react";

const navigationItems = [
  { title: "Directory", url: "/directory", icon: Search },
  { title: "Timetable", url: "/timetable", icon: Calendar },
  { title: "Planner", url: "/planner", icon: Grid3x3 },
  { title: "Course Tree", url: "/course-tree", icon: Grid3x3 },
  { title: "Drop Rates", url: "/drop-rates", icon: Grid3x3 },
  { title: "Compare", url: "/compare", icon: Grid3x3 },
];

const companyItems = [
  { title: "About", url: "/about", icon: FileText },
  { title: "Feedback & Report", url: "/feedback", icon: FileText },
  { title: "Changelog", url: "/changelog", icon: FileText },
];

export function AppSidebar() {
  const { state } = useSidebar();
  const location = useLocation();
  
  const isActive = (path: string) => location.pathname === path;
  const isCollapsed = state === "collapsed";

  return (
    <Sidebar className={isCollapsed ? "w-14" : "w-64"} collapsible="icon">
      <SidebarContent className="bg-blue-900 text-white">
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {navigationItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <NavLink 
                      to={item.url} 
                      className={`flex items-center gap-2 text-blue-100 hover:text-white hover:bg-blue-800 ${
                        isActive(item.url) ? 'bg-blue-700 text-white' : ''
                      }`}
                    >
                      <item.icon className="h-4 w-4" />
                      {!isCollapsed && <span>{item.title}</span>}
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarGroup>
          <SidebarGroupLabel className="text-blue-300 uppercase text-xs font-semibold">
            {!isCollapsed && "Company"}
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {companyItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <NavLink 
                      to={item.url}
                      className={`flex items-center gap-2 text-blue-100 hover:text-white hover:bg-blue-800 ${
                        isActive(item.url) ? 'bg-blue-700 text-white' : ''
                      }`}
                    >
                      <item.icon className="h-4 w-4" />
                      {!isCollapsed && <span>{item.title}</span>}
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
