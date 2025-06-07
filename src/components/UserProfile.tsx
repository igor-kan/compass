
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import { User, BookOpen, Award, Star, Settings, Edit } from 'lucide-react';

interface UserData {
  name: string;
  studentId: string;
  program: string;
  year: number;
  campus: string;
  gpa: number;
  creditsCompleted: number;
  totalCredits: number;
  coursesCompleted: string[];
  contributions: {
    materialsUploaded: number;
    helpfulVotes: number;
    reputation: number;
  };
}

const sampleUser: UserData = {
  name: 'Alex Johnson',
  studentId: '1008123456',
  program: 'Computer Science Specialist',
  year: 3,
  campus: 'St. George',
  gpa: 3.7,
  creditsCompleted: 12.5,
  totalCredits: 20.0,
  coursesCompleted: ['CSC108H1', 'CSC148H1', 'CSC165H1', 'CSC207H1', 'MAT137Y1', 'MAT223H1'],
  contributions: {
    materialsUploaded: 8,
    helpfulVotes: 127,
    reputation: 4.3
  }
};

export function UserProfile() {
  const [user, setUser] = useState(sampleUser);
  const [isEditing, setIsEditing] = useState(false);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-slate-900 mb-2">My Profile</h1>
          <p className="text-slate-600">Manage your academic profile and community contributions</p>
        </div>
        <Button 
          variant="outline"
          onClick={() => setIsEditing(!isEditing)}
        >
          <Edit className="h-4 w-4 mr-2" />
          {isEditing ? 'Save Changes' : 'Edit Profile'}
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <Tabs defaultValue="academic" className="space-y-4">
            <TabsList>
              <TabsTrigger value="academic">Academic Progress</TabsTrigger>
              <TabsTrigger value="community">Community</TabsTrigger>
              <TabsTrigger value="achievements">Achievements</TabsTrigger>
            </TabsList>

            <TabsContent value="academic" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Degree Progress</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <div className="flex justify-between items-center mb-2">
                        <span className="font-medium">Overall Progress</span>
                        <span className="text-sm text-slate-600">
                          {user.creditsCompleted} / {user.totalCredits} FCE
                        </span>
                      </div>
                      <Progress value={(user.creditsCompleted / user.totalCredits) * 100} className="h-3" />
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4">
                      <div className="text-center p-3 bg-blue-50 rounded-lg">
                        <div className="text-2xl font-bold text-blue-600">{user.gpa}</div>
                        <div className="text-sm text-slate-600">Current GPA</div>
                      </div>
                      <div className="text-center p-3 bg-green-50 rounded-lg">
                        <div className="text-2xl font-bold text-green-600">{user.year}</div>
                        <div className="text-sm text-slate-600">Year of Study</div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Completed Courses</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2">
                    {user.coursesCompleted.map(course => (
                      <Badge key={course} variant="outline">{course}</Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="community" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Community Contributions</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-3 gap-4">
                    <div className="text-center p-3 bg-purple-50 rounded-lg">
                      <div className="text-2xl font-bold text-purple-600">{user.contributions.materialsUploaded}</div>
                      <div className="text-sm text-slate-600">Materials Shared</div>
                    </div>
                    <div className="text-center p-3 bg-orange-50 rounded-lg">
                      <div className="text-2xl font-bold text-orange-600">{user.contributions.helpfulVotes}</div>
                      <div className="text-sm text-slate-600">Helpful Votes</div>
                    </div>
                    <div className="text-center p-3 bg-yellow-50 rounded-lg">
                      <div className="text-2xl font-bold text-yellow-600">{user.contributions.reputation}</div>
                      <div className="text-sm text-slate-600">Reputation</div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Recent Activity</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex items-center gap-3 text-sm">
                      <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                      <span>Uploaded CSC236 Final Exam notes</span>
                      <span className="text-slate-500">2 days ago</span>
                    </div>
                    <div className="flex items-center gap-3 text-sm">
                      <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                      <span>Received 5 helpful votes on MAT137 study guide</span>
                      <span className="text-slate-500">1 week ago</span>
                    </div>
                    <div className="flex items-center gap-3 text-sm">
                      <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                      <span>Completed CSC207 course evaluation</span>
                      <span className="text-slate-500">2 weeks ago</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="achievements" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Badges & Achievements</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    <div className="text-center p-4 border rounded-lg">
                      <Award className="h-8 w-8 mx-auto mb-2 text-yellow-500" />
                      <div className="font-medium text-sm">Helper</div>
                      <div className="text-xs text-slate-500">50+ helpful votes</div>
                    </div>
                    <div className="text-center p-4 border rounded-lg">
                      <BookOpen className="h-8 w-8 mx-auto mb-2 text-blue-500" />
                      <div className="font-medium text-sm">Contributor</div>
                      <div className="text-xs text-slate-500">5+ materials shared</div>
                    </div>
                    <div className="text-center p-4 border rounded-lg">
                      <Star className="h-8 w-8 mx-auto mb-2 text-purple-500" />
                      <div className="font-medium text-sm">Reviewer</div>
                      <div className="text-xs text-slate-500">20+ course reviews</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>

        <div>
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <User className="h-5 w-5" />
                Profile Information
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {isEditing ? (
                  <>
                    <div>
                      <label className="block text-sm font-medium mb-1">Name</label>
                      <Input value={user.name} onChange={(e) => setUser(prev => ({ ...prev, name: e.target.value }))} />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-1">Program</label>
                      <Input value={user.program} onChange={(e) => setUser(prev => ({ ...prev, program: e.target.value }))} />
                    </div>
                  </>
                ) : (
                  <>
                    <div>
                      <div className="text-sm text-slate-600">Name</div>
                      <div className="font-medium">{user.name}</div>
                    </div>
                    <div>
                      <div className="text-sm text-slate-600">Student ID</div>
                      <div className="font-medium">{user.studentId}</div>
                    </div>
                    <div>
                      <div className="text-sm text-slate-600">Program</div>
                      <div className="font-medium">{user.program}</div>
                    </div>
                    <div>
                      <div className="text-sm text-slate-600">Campus</div>
                      <div className="font-medium">{user.campus}</div>
                    </div>
                  </>
                )}
              </div>
            </CardContent>
          </Card>

          <Card className="mt-4">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Settings className="h-5 w-5" />
                Quick Actions
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <Button variant="outline" className="w-full justify-start">
                  <BookOpen className="h-4 w-4 mr-2" />
                  Upload Study Material
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <Star className="h-4 w-4 mr-2" />
                  Rate a Course
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <User className="h-4 w-4 mr-2" />
                  Update Profile
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
