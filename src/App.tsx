
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Directory from "./pages/Directory";
import Timetable from "./pages/Timetable";
import Planner from "./pages/Planner";
import CourseTree from "./pages/CourseTree";
import DropRates from "./pages/DropRates";
import Compare from "./pages/Compare";
import StudyMaterials from "./pages/StudyMaterials";
import CampusNavigation from "./pages/CampusNavigation";
import Profile from "./pages/Profile";
import About from "./pages/About";
import Feedback from "./pages/Feedback";
import Changelog from "./pages/Changelog";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/directory" element={<Directory />} />
          <Route path="/timetable" element={<Timetable />} />
          <Route path="/planner" element={<Planner />} />
          <Route path="/course-tree" element={<CourseTree />} />
          <Route path="/drop-rates" element={<DropRates />} />
          <Route path="/compare" element={<Compare />} />
          <Route path="/study-materials" element={<StudyMaterials />} />
          <Route path="/campus-navigation" element={<CampusNavigation />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/about" element={<About />} />
          <Route path="/feedback" element={<Feedback />} />
          <Route path="/changelog" element={<Changelog />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
