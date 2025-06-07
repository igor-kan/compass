
import { useState } from "react";
import { Layout } from "@/components/Layout";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Search, Filter } from "lucide-react";

const sampleCourses = [
  {
    code: "CSC148H1",
    title: "Introduction to Computer Science",
    description: "An introduction to software development and computational thinking...",
    campus: "St. George",
    department: "Computer Science",
    credits: 0.5,
    level: "Undergraduate",
    prerequisites: ["CSC108H1"],
    exclusions: ["CSC150H1"],
    sessions: ["Fall", "Winter", "Summer"],
    rating: { overall: 4.2, difficulty: 3.8, workload: 4.1 }
  },
  {
    code: "MAT137Y1",
    title: "Calculus with Proofs",
    description: "A theoretical calculus course emphasizing proofs and mathematical reasoning...",
    campus: "St. George",
    department: "Mathematics",
    credits: 1.0,
    level: "Undergraduate", 
    prerequisites: ["Advanced Functions", "Calculus and Vectors"],
    exclusions: ["MAT135H1", "MAT136H1"],
    sessions: ["Fall", "Winter"],
    rating: { overall: 3.9, difficulty: 4.5, workload: 4.3 }
  },
  {
    code: "PHY131H1",
    title: "Introduction to Physics I",
    description: "Classical mechanics, oscillations, waves, and thermodynamics...",
    campus: "St. George",
    department: "Physics",
    credits: 0.5,
    level: "Undergraduate",
    prerequisites: ["Advanced Functions"],
    exclusions: ["PHY151H1"],
    sessions: ["Fall", "Winter"],
    rating: { overall: 3.7, difficulty: 4.0, workload: 3.9 }
  }
];

export default function Directory() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCampus, setSelectedCampus] = useState("all");
  const [selectedLevel, setSelectedLevel] = useState("all");
  const [selectedDepartment, setSelectedDepartment] = useState("all");

  const filteredCourses = sampleCourses.filter(course => {
    return (
      course.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
      course.title.toLowerCase().includes(searchTerm.toLowerCase())
    ) &&
    (selectedCampus === "all" || course.campus === selectedCampus) &&
    (selectedLevel === "all" || course.level === selectedLevel) &&
    (selectedDepartment === "all" || course.department === selectedDepartment);
  });

  return (
    <Layout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-slate-900 mb-2">Course Directory</h1>
          <p className="text-slate-600">Explore courses across all University of Toronto campuses</p>
        </div>

        {/* Search and Filters */}
        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
            <div className="md:col-span-2">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  placeholder="Course code or keyword"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            
            <Select value={selectedCampus} onValueChange={setSelectedCampus}>
              <SelectTrigger>
                <SelectValue placeholder="Campus" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Campuses</SelectItem>
                <SelectItem value="St. George">St. George</SelectItem>
                <SelectItem value="Mississauga">Mississauga</SelectItem>
                <SelectItem value="Scarborough">Scarborough</SelectItem>
              </SelectContent>
            </Select>

            <Select value={selectedLevel} onValueChange={setSelectedLevel}>
              <SelectTrigger>
                <SelectValue placeholder="Level" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Levels</SelectItem>
                <SelectItem value="Undergraduate">Undergraduate</SelectItem>
                <SelectItem value="Graduate">Graduate</SelectItem>
              </SelectContent>
            </Select>

            <Select value={selectedDepartment} onValueChange={setSelectedDepartment}>
              <SelectTrigger>
                <SelectValue placeholder="Department" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Departments</SelectItem>
                <SelectItem value="Computer Science">Computer Science</SelectItem>
                <SelectItem value="Mathematics">Mathematics</SelectItem>
                <SelectItem value="Physics">Physics</SelectItem>
                <SelectItem value="Chemistry">Chemistry</SelectItem>
                <SelectItem value="Biology">Biology</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="flex items-center gap-2 mt-4">
            <Button variant="outline" size="sm">
              <Filter className="h-4 w-4 mr-2" />
              All Filters
            </Button>
          </div>
        </div>

        {/* Course Results */}
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <p className="text-slate-600">{filteredCourses.length} courses found</p>
          </div>
          
          {filteredCourses.map((course) => (
            <Card key={course.code} className="hover:shadow-md transition-shadow cursor-pointer">
              <CardContent className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="text-xl font-semibold text-blue-900">{course.code}</h3>
                      <Badge variant="secondary">{course.campus}</Badge>
                      <Badge variant="outline">{course.credits} FCE</Badge>
                    </div>
                    <h4 className="text-lg font-medium text-slate-900 mb-2">{course.title}</h4>
                    <p className="text-slate-600 mb-3">{course.description}</p>
                  </div>
                  
                  <div className="text-right">
                    <div className="text-2xl font-bold text-blue-600">{course.rating.overall}</div>
                    <div className="text-sm text-slate-500">Overall Rating</div>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                  <div>
                    <span className="font-medium text-slate-700">Prerequisites:</span>
                    <div className="mt-1">
                      {course.prerequisites.map((prereq, index) => (
                        <Badge key={index} variant="outline" className="mr-1 mb-1">
                          {prereq}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  
                  <div>
                    <span className="font-medium text-slate-700">Sessions:</span>
                    <div className="mt-1">
                      {course.sessions.map((session, index) => (
                        <Badge key={index} variant="secondary" className="mr-1 mb-1">
                          {session}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  
                  <div>
                    <span className="font-medium text-slate-700">Ratings:</span>
                    <div className="mt-1 space-y-1">
                      <div className="flex justify-between">
                        <span>Difficulty:</span>
                        <span className="font-medium">{course.rating.difficulty}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Workload:</span>
                        <span className="font-medium">{course.rating.workload}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </Layout>
  );
}
