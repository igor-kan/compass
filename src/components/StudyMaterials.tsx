
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Upload, Download, ThumbsUp, ThumbsDown, Flag, Search, Filter } from 'lucide-react';

interface StudyMaterial {
  id: string;
  title: string;
  course: string;
  type: 'notes' | 'exam' | 'assignment' | 'slides';
  professor: string;
  term: string;
  uploadedBy: string;
  uploadDate: string;
  upvotes: number;
  downvotes: number;
  downloads: number;
}

const sampleMaterials: StudyMaterial[] = [
  {
    id: '1',
    title: 'CSC148 Final Exam - Fall 2023',
    course: 'CSC148H1',
    type: 'exam',
    professor: 'David Liu',
    term: 'Fall 2023',
    uploadedBy: 'student_123',
    uploadDate: '2023-12-15',
    upvotes: 45,
    downvotes: 2,
    downloads: 156
  },
  {
    id: '2',
    title: 'Data Structures Lecture Notes (Weeks 1-6)',
    course: 'CSC148H1',
    type: 'notes',
    professor: 'David Liu',
    term: 'Fall 2023',
    uploadedBy: 'helpful_student',
    uploadDate: '2023-10-22',
    upvotes: 32,
    downvotes: 1,
    downloads: 89
  },
  {
    id: '3',
    title: 'Assignment 3 - Binary Search Trees',
    course: 'CSC148H1',
    type: 'assignment',
    professor: 'David Liu',
    term: 'Fall 2023',
    uploadedBy: 'cs_student',
    uploadDate: '2023-11-08',
    upvotes: 18,
    downvotes: 0,
    downloads: 67
  }
];

export function StudyMaterials() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedType, setSelectedType] = useState('all');
  const [materials, setMaterials] = useState(sampleMaterials);

  const filteredMaterials = materials.filter(material => {
    return (
      material.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      material.course.toLowerCase().includes(searchTerm.toLowerCase())
    ) && (selectedType === 'all' || material.type === selectedType);
  });

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'exam': return 'bg-red-100 text-red-800';
      case 'notes': return 'bg-blue-100 text-blue-800';
      case 'assignment': return 'bg-green-100 text-green-800';
      case 'slides': return 'bg-purple-100 text-purple-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const handleVote = (id: string, voteType: 'up' | 'down') => {
    setMaterials(prev => prev.map(material => {
      if (material.id === id) {
        return {
          ...material,
          upvotes: voteType === 'up' ? material.upvotes + 1 : material.upvotes,
          downvotes: voteType === 'down' ? material.downvotes + 1 : material.downvotes
        };
      }
      return material;
    }));
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-slate-900 mb-2">Study Materials</h1>
          <p className="text-slate-600">Share and access course materials from the community</p>
        </div>
        <Button className="bg-blue-600 hover:bg-blue-700">
          <Upload className="h-4 w-4 mr-2" />
          Upload Material
        </Button>
      </div>

      <Tabs defaultValue="browse" className="space-y-4">
        <TabsList>
          <TabsTrigger value="browse">Browse Materials</TabsTrigger>
          <TabsTrigger value="upload">Upload Material</TabsTrigger>
          <TabsTrigger value="my-uploads">My Uploads</TabsTrigger>
        </TabsList>

        <TabsContent value="browse" className="space-y-4">
          <div className="bg-white p-4 rounded-lg shadow-sm border">
            <div className="flex gap-4 items-center">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  placeholder="Search by course code, title, or professor..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
              <div className="flex gap-2">
                {['all', 'exam', 'notes', 'assignment', 'slides'].map(type => (
                  <Button
                    key={type}
                    variant={selectedType === type ? "default" : "outline"}
                    size="sm"
                    onClick={() => setSelectedType(type)}
                  >
                    {type.charAt(0).toUpperCase() + type.slice(1)}
                  </Button>
                ))}
              </div>
            </div>
          </div>

          <div className="space-y-4">
            {filteredMaterials.map(material => (
              <Card key={material.id} className="hover:shadow-md transition-shadow">
                <CardContent className="p-6">
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="text-lg font-semibold">{material.title}</h3>
                        <Badge className={getTypeColor(material.type)}>
                          {material.type}
                        </Badge>
                        <Badge variant="outline">{material.course}</Badge>
                      </div>
                      
                      <div className="text-sm text-slate-600 mb-3">
                        <span>Professor: {material.professor}</span> • 
                        <span> {material.term}</span> • 
                        <span> Uploaded by {material.uploadedBy}</span> • 
                        <span> {material.uploadDate}</span>
                      </div>
                      
                      <div className="flex items-center gap-4 text-sm text-slate-500">
                        <span>{material.downloads} downloads</span>
                        <div className="flex items-center gap-2">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleVote(material.id, 'up')}
                            className="h-8 px-2"
                          >
                            <ThumbsUp className="h-4 w-4 mr-1" />
                            {material.upvotes}
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleVote(material.id, 'down')}
                            className="h-8 px-2"
                          >
                            <ThumbsDown className="h-4 w-4 mr-1" />
                            {material.downvotes}
                          </Button>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm">
                        <Download className="h-4 w-4 mr-2" />
                        Download
                      </Button>
                      <Button variant="outline" size="sm">
                        <Flag className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="upload" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Upload Study Material</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Course Code</label>
                  <Input placeholder="e.g. CSC148H1" />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Material Type</label>
                  <select className="w-full p-2 border rounded-md">
                    <option value="notes">Lecture Notes</option>
                    <option value="exam">Past Exam</option>
                    <option value="assignment">Assignment</option>
                    <option value="slides">Slides</option>
                  </select>
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-2">Title</label>
                <Input placeholder="Descriptive title for your material" />
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Professor</label>
                  <Input placeholder="Professor name" />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Term</label>
                  <Input placeholder="e.g. Fall 2023" />
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-2">Upload File</label>
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                  <Upload className="h-8 w-8 mx-auto mb-2 text-gray-400" />
                  <p className="text-sm text-gray-600">Click to upload or drag and drop</p>
                  <p className="text-xs text-gray-400">PDF, DOC, PPT (max 10MB)</p>
                </div>
              </div>
              
              <Button className="w-full">Upload Material</Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="my-uploads">
          <Card>
            <CardHeader>
              <CardTitle>My Uploaded Materials</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center py-8 text-slate-500">
                <Upload className="h-12 w-12 mx-auto mb-4 opacity-50" />
                <p>No materials uploaded yet</p>
                <p className="text-sm">Start sharing your study materials with the community!</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
