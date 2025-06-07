
import { Layout } from "@/components/Layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Plus, GraduationCap, BookOpen } from "lucide-react";

const degreeProgress = {
  program: "Computer Science Specialist",
  campus: "St. George",
  totalCredits: 20.0,
  completedCredits: 8.5,
  inProgressCredits: 2.0,
  requirements: [
    {
      category: "Core CS Courses",
      required: 7.0,
      completed: 3.5,
      inProgress: 1.0,
      courses: ["CSC108H1", "CSC148H1", "CSC165H1", "CSC207H1", "CSC236H1", "CSC258H1", "CSC263H1"]
    },
    {
      category: "Mathematics",
      required: 2.0,
      completed: 2.0,
      inProgress: 0,
      courses: ["MAT137Y1", "MAT223H1"]
    },
    {
      category: "Statistics",
      required: 1.0,
      completed: 0.5,
      inProgress: 0.5,
      courses: ["STA247H1"]
    }
  ]
};

export default function Planner() {
  return (
    <Layout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-slate-900 mb-2">Academic Planner</h1>
            <p className="text-slate-600">Plan your degree and track graduation requirements</p>
          </div>
          <Button className="bg-blue-600 hover:bg-blue-700">
            <Plus className="h-4 w-4 mr-2" />
            Add Course Plan
          </Button>
        </div>

        {/* Degree Progress Overview */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <GraduationCap className="h-5 w-5" />
              Degree Progress
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2">
                <div className="mb-4">
                  <h3 className="text-lg font-semibold">{degreeProgress.program}</h3>
                  <p className="text-slate-600">{degreeProgress.campus} Campus</p>
                </div>
                
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <span className="font-medium">Overall Progress</span>
                      <span className="text-sm text-slate-600">
                        {degreeProgress.completedCredits + degreeProgress.inProgressCredits} / {degreeProgress.totalCredits} FCE
                      </span>
                    </div>
                    <Progress 
                      value={(degreeProgress.completedCredits + degreeProgress.inProgressCredits) / degreeProgress.totalCredits * 100}
                      className="h-3"
                    />
                  </div>
                  
                  {degreeProgress.requirements.map((req, index) => (
                    <div key={index} className="border rounded-lg p-4">
                      <div className="flex justify-between items-center mb-2">
                        <h4 className="font-medium">{req.category}</h4>
                        <span className="text-sm text-slate-600">
                          {req.completed + req.inProgress} / {req.required} FCE
                        </span>
                      </div>
                      <Progress 
                        value={(req.completed + req.inProgress) / req.required * 100}
                        className="h-2 mb-3"
                      />
                      <div className="flex flex-wrap gap-1">
                        {req.courses.map((course, courseIndex) => (
                          <Badge 
                            key={courseIndex} 
                            variant={courseIndex < req.completed * 2 ? "default" : "secondary"}
                            className={courseIndex < req.completed * 2 ? "bg-green-600" : ""}
                          >
                            {course}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              
              <div>
                <div className="bg-slate-50 rounded-lg p-4">
                  <h4 className="font-semibold mb-3">Quick Stats</h4>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span>Completed:</span>
                      <span className="font-medium text-green-600">{degreeProgress.completedCredits} FCE</span>
                    </div>
                    <div className="flex justify-between">
                      <span>In Progress:</span>
                      <span className="font-medium text-blue-600">{degreeProgress.inProgressCredits} FCE</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Remaining:</span>
                      <span className="font-medium text-slate-600">
                        {degreeProgress.totalCredits - degreeProgress.completedCredits - degreeProgress.inProgressCredits} FCE
                      </span>
                    </div>
                    <div className="pt-2 border-t">
                      <div className="flex justify-between">
                        <span className="font-medium">Total Required:</span>
                        <span className="font-medium">{degreeProgress.totalCredits} FCE</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Course Planning by Semester */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BookOpen className="h-5 w-5" />
              Semester Planning
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {['Fall 2024', 'Winter 2025', 'Summer 2025'].map((semester, index) => (
                <div key={index} className="border rounded-lg p-4">
                  <h4 className="font-semibold mb-3">{semester}</h4>
                  <div className="space-y-2 mb-4">
                    {index === 0 ? (
                      <>
                        <div className="p-2 bg-blue-50 rounded border border-blue-200">
                          <div className="font-medium text-sm">CSC236H1</div>
                          <div className="text-xs text-slate-600">Introduction to Theory of Computation</div>
                        </div>
                        <div className="p-2 bg-blue-50 rounded border border-blue-200">
                          <div className="font-medium text-sm">STA247H1</div>
                          <div className="text-xs text-slate-600">Probability with Computer Applications</div>
                        </div>
                      </>
                    ) : (
                      <div className="text-center py-8 text-slate-400">
                        No courses planned
                      </div>
                    )}
                  </div>
                  <Button variant="outline" size="sm" className="w-full">
                    <Plus className="h-4 w-4 mr-2" />
                    Add Course
                  </Button>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
}
