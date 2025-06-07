
import React, { useEffect, useRef } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Maximize2, ZoomIn, ZoomOut, RotateCcw } from 'lucide-react';

interface Course {
  id: string;
  code: string;
  title: string;
  prerequisites: string[];
  level: number;
}

const sampleCourses: Course[] = [
  { id: '1', code: 'CSC108H1', title: 'Introduction to Programming', prerequisites: [], level: 1 },
  { id: '2', code: 'CSC148H1', title: 'Introduction to Computer Science', prerequisites: ['CSC108H1'], level: 2 },
  { id: '3', code: 'CSC165H1', title: 'Mathematical Expression and Reasoning', prerequisites: [], level: 1 },
  { id: '4', code: 'CSC207H1', title: 'Software Design', prerequisites: ['CSC148H1'], level: 3 },
  { id: '5', code: 'CSC236H1', title: 'Introduction to Theory of Computation', prerequisites: ['CSC148H1', 'CSC165H1'], level: 3 },
  { id: '6', code: 'CSC263H1', title: 'Data Structures and Analysis', prerequisites: ['CSC207H1', 'CSC236H1'], level: 4 },
];

export function CourseGraph() {
  const svgRef = useRef<SVGSVGElement>(null);
  const [selectedCourse, setSelectedCourse] = React.useState<Course | null>(null);

  const renderGraph = () => {
    if (!svgRef.current) return;

    const svg = svgRef.current;
    const width = 800;
    const height = 600;
    
    // Clear previous content
    svg.innerHTML = '';
    
    // Create course nodes positioned by level
    const levelHeight = height / 5;
    const coursesByLevel = sampleCourses.reduce((acc, course) => {
      if (!acc[course.level]) acc[course.level] = [];
      acc[course.level].push(course);
      return acc;
    }, {} as Record<number, Course[]>);

    const nodes: { course: Course; x: number; y: number }[] = [];
    
    Object.entries(coursesByLevel).forEach(([level, courses]) => {
      const levelNum = parseInt(level);
      const courseWidth = width / (courses.length + 1);
      courses.forEach((course, index) => {
        nodes.push({
          course,
          x: courseWidth * (index + 1),
          y: levelHeight * levelNum
        });
      });
    });

    // Draw edges (prerequisites)
    nodes.forEach(node => {
      node.course.prerequisites.forEach(prereqCode => {
        const prereqNode = nodes.find(n => n.course.code === prereqCode);
        if (prereqNode) {
          const line = document.createElementNS('http://www.w3.org/2000/svg', 'line');
          line.setAttribute('x1', prereqNode.x.toString());
          line.setAttribute('y1', prereqNode.y.toString());
          line.setAttribute('x2', node.x.toString());
          line.setAttribute('y2', node.y.toString());
          line.setAttribute('stroke', '#3b82f6');
          line.setAttribute('stroke-width', '2');
          line.setAttribute('marker-end', 'url(#arrowhead)');
          svg.appendChild(line);
        }
      });
    });

    // Create arrowhead marker
    const defs = document.createElementNS('http://www.w3.org/2000/svg', 'defs');
    const marker = document.createElementNS('http://www.w3.org/2000/svg', 'marker');
    marker.setAttribute('id', 'arrowhead');
    marker.setAttribute('markerWidth', '10');
    marker.setAttribute('markerHeight', '7');
    marker.setAttribute('refX', '9');
    marker.setAttribute('refY', '3.5');
    marker.setAttribute('orient', 'auto');
    
    const polygon = document.createElementNS('http://www.w3.org/2000/svg', 'polygon');
    polygon.setAttribute('points', '0 0, 10 3.5, 0 7');
    polygon.setAttribute('fill', '#3b82f6');
    
    marker.appendChild(polygon);
    defs.appendChild(marker);
    svg.appendChild(defs);

    // Draw nodes
    nodes.forEach(node => {
      const g = document.createElementNS('http://www.w3.org/2000/svg', 'g');
      g.setAttribute('transform', `translate(${node.x - 60}, ${node.y - 25})`);
      g.style.cursor = 'pointer';
      
      const rect = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
      rect.setAttribute('width', '120');
      rect.setAttribute('height', '50');
      rect.setAttribute('rx', '8');
      rect.setAttribute('fill', selectedCourse?.id === node.course.id ? '#1d4ed8' : '#f8fafc');
      rect.setAttribute('stroke', '#3b82f6');
      rect.setAttribute('stroke-width', '2');
      
      const text = document.createElementNS('http://www.w3.org/2000/svg', 'text');
      text.setAttribute('x', '60');
      text.setAttribute('y', '30');
      text.setAttribute('text-anchor', 'middle');
      text.setAttribute('fill', selectedCourse?.id === node.course.id ? '#ffffff' : '#1e293b');
      text.setAttribute('font-size', '12');
      text.setAttribute('font-weight', 'bold');
      text.textContent = node.course.code;
      
      g.appendChild(rect);
      g.appendChild(text);
      
      g.addEventListener('click', () => {
        setSelectedCourse(node.course);
      });
      
      svg.appendChild(g);
    });
  };

  useEffect(() => {
    renderGraph();
  }, [selectedCourse]);

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold">Course Dependency Graph</h2>
        <div className="flex gap-2">
          <Button variant="outline" size="sm">
            <ZoomIn className="h-4 w-4" />
          </Button>
          <Button variant="outline" size="sm">
            <ZoomOut className="h-4 w-4" />
          </Button>
          <Button variant="outline" size="sm">
            <RotateCcw className="h-4 w-4" />
          </Button>
          <Button variant="outline" size="sm">
            <Maximize2 className="h-4 w-4" />
          </Button>
        </div>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <div className="lg:col-span-2">
          <Card>
            <CardContent className="p-4">
              <svg
                ref={svgRef}
                width="100%"
                height="600"
                viewBox="0 0 800 600"
                className="border rounded"
              />
            </CardContent>
          </Card>
        </div>
        
        <div>
          <Card>
            <CardHeader>
              <CardTitle>Course Details</CardTitle>
            </CardHeader>
            <CardContent>
              {selectedCourse ? (
                <div className="space-y-4">
                  <div>
                    <Badge variant="outline">{selectedCourse.code}</Badge>
                    <h3 className="font-semibold mt-2">{selectedCourse.title}</h3>
                  </div>
                  
                  <div>
                    <h4 className="font-medium mb-2">Prerequisites:</h4>
                    {selectedCourse.prerequisites.length > 0 ? (
                      <div className="flex flex-wrap gap-1">
                        {selectedCourse.prerequisites.map(prereq => (
                          <Badge key={prereq} variant="secondary">{prereq}</Badge>
                        ))}
                      </div>
                    ) : (
                      <p className="text-slate-500 text-sm">No prerequisites</p>
                    )}
                  </div>
                  
                  <div>
                    <h4 className="font-medium mb-2">Course Level:</h4>
                    <Badge>{selectedCourse.level}00-level</Badge>
                  </div>
                </div>
              ) : (
                <p className="text-slate-500">Click on a course to view details</p>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
