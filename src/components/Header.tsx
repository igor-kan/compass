
import { SidebarTrigger } from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, Settings, User } from "lucide-react";

export function Header() {
  return (
    <header className="h-16 border-b bg-white flex items-center justify-between px-6">
      <div className="flex items-center gap-4">
        <SidebarTrigger />
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-blue-600 rounded flex items-center justify-center">
            <span className="text-white font-bold text-sm">U</span>
          </div>
          <span className="font-bold text-xl text-slate-800">UofT Course Compass</span>
        </div>
      </div>
      
      <div className="flex items-center gap-4">
        <div className="relative max-w-md">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
          <Input
            placeholder="Search courses, professors..."
            className="pl-10 w-64"
          />
        </div>
        
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="sm">
            <Settings className="h-4 w-4" />
          </Button>
          <Button variant="outline" size="sm">
            Log In
          </Button>
          <Button size="sm" className="bg-blue-600 hover:bg-blue-700">
            Sign Up
          </Button>
        </div>
      </div>
    </header>
  );
}
