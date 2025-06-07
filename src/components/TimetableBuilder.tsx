
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Plus, Trash2, Download, Calendar, Clock, MapPin } from 'lucide-react';

interface TimeSlot {
  day: string;
  startTime: string;
  endTime: string;
}

interface CourseSection {
  id: string;
  courseCode: string;
  courseTitle: string;
  section: string;
  instructor: string;
  type: 'LEC' | 'TUT' | 'PRA';
  timeSlots: TimeSlot[];
  location: string;
  capacity: number;
  enrolled: number;
  waitlist: number;
}

const sampleSections: CourseSection[] = [
  {
    id: '1',
    courseCode: 'CSC148H1',
    courseTitle: 'Introduction to Computer Science',
    section: 'LEC01',
    instructor: 'David Liu',
    type: 'LEC',
    timeSlots: [
      { day: 'Monday', startTime: '10:00', endTime: '11:00' },
      { day: 'Wednesday', startTime: '10:00', endTime: '11:00' },
      { day: 'Friday', startTime: '10:00', endTime: '11:00' }
    ],
    location: 'BA 1200',
    capacity: 300,
    enrolled: 285,
    waitlist: 15
  },
  {
    id: '2',
    courseCode: 'CSC148H1',
    courseTitle: 'Introduction to Computer Science',
    section: 'TUT0001',
    instructor: 'TA Team',
    type: 'TUT',
    timeSlots: [
      { day: 'Friday', startTime: '11:00', endTime: '12:00' }
    ],
    location: 'BA 2165',
    capacity: 30,
    enrolled: 28,
    waitlist: 2
  },
  {
    id: '3',
    courseCode: 'MAT137Y1',
    courseTitle: 'Calculus with Proofs',
    section: 'LEC01',
    instructor: 'Marco Gualtieri',
    type: 'LEC',
    timeSlots: [
      { day: 'Tuesday', startTime: '14:00', endTime: '16:00' },
      { day: 'Thursday', startTime: '14:00', endTime: '16:00' }
    ],
    location: 'MP 203',
    capacity: 200,
    enrolled: 195,
    waitlist: 8
  }
];

export function TimetableBuilder() {
  const [selectedSections, setSelectedSections] = useState<CourseSection[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTerm, setSelectedTerm] = useState('Fall 2024');

  const timeSlots = Array.from({ length: 13 }, (_, i) => {
    const hour = 8 + i;
    return `${hour.toString().padStart(2, '0')}:00`;
  });

  const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];

  const addSection = (section: CourseSection) => {
    // Check for conflicts
    const hasConflict = selectedSections.some(selected => 
      section.timeSlots.some(newSlot => 
        selected.timeSlots.some(existingSlot => 
          newSlot.day === existingSlot.day &&
          ((newSlot.startTime >= existingSlot.startTime && newSlot.startTime < existingSlot.endTime) ||
           (newSlot.endTime > existingSlot.startTime && newSlot.endTime <= existingSlot.endTime))
        )
      )
    );

    if (hasConflict) {
      alert('Time conflict detected!');
      return;
    }

    setSelectedSections(prev => [...prev, section]);
  };

  const removeSection = (sectionId: string) => {
    setSelectedSections(prev => prev.filter(section => section.id !== sectionId));
  };

  const filteredSections = sampleSections.filter(section =>
    section.courseCode.toLowerCase().includes(searchTerm.toLowerCase()) ||
    section.courseTitle.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getSectionPosition = (timeSlot: TimeSlot) => {
    const dayIndex = days.indexOf(timeSlot.day);
    const startHour = parseInt(timeSlot.startTime.split(':')[0]);
    const endHour = parseInt(timeSlot.endTime.split(':')[0]);
    const startMinute = parseInt(timeSlot.startTime.split(':')[1]);
    const endMinute = parseInt(timeSlot.endTime.split(':')[1]);
    
    const top = ((startHour - 8) * 60 + startMinute) / 60 * 60; // 60px per hour
    const height = ((endHour - startHour) * 60 + (endMinute - startMinute)) / 60 * 60;
    
    return { dayIndex, top, height };
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-slate-900 mb-2">Timetable Builder</h1>
          <p className="text-slate-600">Build your perfect course schedule</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <Download className="h-4 w-4 mr-2" />
            Export
          </Button>
          <Button>
            <Calendar className="h-4 w-4 mr-2" />
            Save Schedule
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <div className="flex justify-between items-center">
                <CardTitle>Weekly Schedule</CardTitle>
                <Select value={selectedTerm} onValueChange={setSelectedTerm}>
                  <SelectTrigger className="w-32">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Fall 2024">Fall 2024</SelectItem>
                    <SelectItem value="Winter 2025">Winter 2025</SelectItem>
                    <SelectItem value="Summer 2025">Summer 2025</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardHeader>
            <CardContent>
              <div className="relative">
                {/* Time grid */}
                <div className="grid grid-cols-6 gap-0 border">
                  {/* Header row */}
                  <div className="border-r p-2 bg-slate-50 font-medium text-sm">Time</div>
                  {days.map(day => (
                    <div key={day} className="border-r p-2 bg-slate-50 font-medium text-sm text-center">
                      {day}
                    </div>
                  ))}
                  
                  {/* Time slots */}
                  {timeSlots.map(time => (
                    <React.Fragment key={time}>
                      <div className="border-r border-t p-2 text-xs text-slate-500 bg-slate-25 h-12">
                        {time}
                      </div>
                      {days.map(day => (
                        <div key={`${day}-${time}`} className="border-r border-t h-12 relative">
                          {/* Course blocks will be positioned here */}
                        </div>
                      ))}
                    </React.Fragment>
                  ))}
                </div>
                
                {/* Course blocks overlay */}
                <div className="absolute inset-0 pointer-events-none">
                  {selectedSections.map(section => 
                    section.timeSlots.map((timeSlot, index) => {
                      const { dayIndex, top, height } = getSectionPosition(timeSlot);
                      return (
                        <div
                          key={`${section.id}-${index}`}
                          className="absolute bg-blue-500 text-white text-xs p-1 rounded pointer-events-auto cursor-pointer overflow-hidden"
                          style={{
                            left: `${16.67 + dayIndex * 16.67}%`,
                            top: `${32 + top}px`,
                            width: '16.67%',
                            height: `${height}px`,
                            minHeight: '20px'
                          }}
                          onClick={() => removeSection(section.id)}
                        >
                          <div className="font-medium">{section.courseCode}</div>
                          <div className="opacity-90">{section.section}</div>
                          <div className="opacity-75">{timeSlot.location || section.location}</div>
                        </div>
                      );
                    })
                  )}
                </div>
              </div>
              
              {selectedSections.length > 0 && (
                <div className="mt-4 p-3 bg-blue-50 rounded-lg">
                  <div className="text-sm font-medium text-blue-900 mb-2">
                    Selected Courses ({selectedSections.length})
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {selectedSections.map(section => (
                      <Badge 
                        key={section.id} 
                        variant="secondary"
                        className="cursor-pointer hover:bg-red-100"
                        onClick={() => removeSection(section.id)}
                      >
                        {section.courseCode} {section.section}
                        <Trash2 className="h-3 w-3 ml-1" />
                      </Badge>
                    ))}
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        <div>
          <Card>
            <CardHeader>
              <CardTitle>Add Courses</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <Input
                  placeholder="Search courses..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
                
                <div className="space-y-3 max-h-96 overflow-y-auto">
                  {filteredSections.map(section => (
                    <div key={section.id} className="border rounded-lg p-3">
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <div className="font-medium text-sm">{section.courseCode}</div>
                          <div className="text-xs text-slate-600">{section.section}</div>
                        </div>
                        <Badge 
                          variant={section.type === 'LEC' ? 'default' : 'secondary'}
                          className="text-xs"
                        >
                          {section.type}
                        </Badge>
                      </div>
                      
                      <div className="text-xs text-slate-600 mb-2">
                        {section.instructor}
                      </div>
                      
                      <div className="space-y-1 mb-3">
                        {section.timeSlots.map((slot, index) => (
                          <div key={index} className="flex items-center text-xs text-slate-600">
                            <Clock className="h-3 w-3 mr-1" />
                            {slot.day} {slot.startTime}-{slot.endTime}
                          </div>
                        ))}
                        <div className="flex items-center text-xs text-slate-600">
                          <MapPin className="h-3 w-3 mr-1" />
                          {section.location}
                        </div>
                      </div>
                      
                      <div className="flex justify-between items-center">
                        <div className="text-xs text-slate-500">
                          {section.enrolled}/{section.capacity}
                          {section.waitlist > 0 && ` (+${section.waitlist} waitlist)`}
                        </div>
                        <Button 
                          size="sm" 
                          variant="outline"
                          onClick={() => addSection(section)}
                          disabled={selectedSections.some(s => s.id === section.id)}
                        >
                          <Plus className="h-3 w-3 mr-1" />
                          Add
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
