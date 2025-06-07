
import React, { useState, useRef, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { MapPin, Navigation, Clock, Route, Search } from 'lucide-react';

interface Building {
  id: string;
  name: string;
  code: string;
  campus: string;
  coordinates: { lat: number; lng: number };
  departments: string[];
  accessibility: boolean;
}

const sampleBuildings: Building[] = [
  {
    id: '1',
    name: 'Bahen Centre for Information Technology',
    code: 'BA',
    campus: 'St. George',
    coordinates: { lat: 43.6595, lng: -79.3977 },
    departments: ['Computer Science', 'Engineering'],
    accessibility: true
  },
  {
    id: '2',
    name: 'Medical Sciences Building',
    code: 'MS',
    campus: 'St. George',
    coordinates: { lat: 43.6606, lng: -79.3947 },
    departments: ['Medicine', 'Life Sciences'],
    accessibility: true
  },
  {
    id: '3',
    name: 'Robarts Library',
    code: 'RL',
    campus: 'St. George',
    coordinates: { lat: 43.6642, lng: -79.3994 },
    departments: ['Library'],
    accessibility: true
  }
];

export function CampusMap() {
  const [selectedCampus, setSelectedCampus] = useState('St. George');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedBuilding, setSelectedBuilding] = useState<Building | null>(null);
  const [routeFrom, setRouteFrom] = useState<Building | null>(null);
  const [routeTo, setRouteTo] = useState<Building | null>(null);
  const mapRef = useRef<HTMLDivElement>(null);

  const filteredBuildings = sampleBuildings.filter(building => 
    building.campus === selectedCampus &&
    (building.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
     building.code.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const calculateWalkingTime = (from: Building, to: Building) => {
    // Simple distance calculation (in reality would use proper mapping APIs)
    const distance = Math.sqrt(
      Math.pow(to.coordinates.lat - from.coordinates.lat, 2) +
      Math.pow(to.coordinates.lng - from.coordinates.lng, 2)
    ) * 111000; // Rough conversion to meters
    
    const walkingSpeed = 5000; // 5 km/h in m/h
    return Math.round((distance / walkingSpeed) * 60); // Convert to minutes
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-slate-900 mb-2">Campus Navigation</h1>
        <p className="text-slate-600">Find buildings, plan routes, and navigate UofT campuses</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <div className="flex justify-between items-center">
                <CardTitle>Interactive Campus Map</CardTitle>
                <Select value={selectedCampus} onValueChange={setSelectedCampus}>
                  <SelectTrigger className="w-40">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="St. George">St. George</SelectItem>
                    <SelectItem value="Scarborough">Scarborough</SelectItem>
                    <SelectItem value="Mississauga">Mississauga</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardHeader>
            <CardContent>
              <div 
                ref={mapRef}
                className="w-full h-96 bg-gradient-to-br from-green-100 to-blue-100 rounded-lg relative overflow-hidden border"
              >
                {/* Simplified map visualization */}
                <div className="absolute inset-0 p-4">
                  <div className="relative w-full h-full">
                    {filteredBuildings.map((building, index) => (
                      <div
                        key={building.id}
                        className={`absolute transform -translate-x-1/2 -translate-y-1/2 cursor-pointer transition-all duration-200 ${
                          selectedBuilding?.id === building.id ? 'scale-110' : 'hover:scale-105'
                        }`}
                        style={{
                          left: `${20 + (index * 25)}%`,
                          top: `${30 + (index * 20)}%`
                        }}
                        onClick={() => setSelectedBuilding(building)}
                      >
                        <div className={`w-6 h-6 rounded-full border-2 border-white shadow-lg flex items-center justify-center text-xs font-bold text-white ${
                          selectedBuilding?.id === building.id ? 'bg-blue-600' : 'bg-red-500'
                        }`}>
                          {building.code.charAt(0)}
                        </div>
                        <div className="absolute top-8 left-1/2 transform -translate-x-1/2 bg-white px-2 py-1 rounded shadow text-xs font-medium whitespace-nowrap">
                          {building.code}
                        </div>
                      </div>
                    ))}
                    
                    {/* Route line */}
                    {routeFrom && routeTo && (
                      <svg className="absolute inset-0 w-full h-full pointer-events-none">
                        <line
                          x1="25%"
                          y1="40%"
                          x2="70%"
                          y2="80%"
                          stroke="#3b82f6"
                          strokeWidth="3"
                          strokeDasharray="5,5"
                        />
                      </svg>
                    )}
                  </div>
                </div>
                
                <div className="absolute bottom-4 right-4 flex gap-2">
                  <Button variant="outline" size="sm">
                    <Navigation className="h-4 w-4" />
                  </Button>
                </div>
              </div>
              
              {/* Route planning */}
              {routeFrom && routeTo && (
                <div className="mt-4 p-4 bg-blue-50 rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <Route className="h-4 w-4 text-blue-600" />
                    <span className="font-medium">Route: {routeFrom.code} → {routeTo.code}</span>
                  </div>
                  <div className="flex items-center gap-4 text-sm text-slate-600">
                    <div className="flex items-center gap-1">
                      <Clock className="h-4 w-4" />
                      ~{calculateWalkingTime(routeFrom, routeTo)} min walk
                    </div>
                    <Badge variant="secondary">Accessible route</Badge>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        <div className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Search Buildings</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="relative mb-4">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  placeholder="Building name or code..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
              
              <div className="space-y-2 max-h-60 overflow-y-auto">
                {filteredBuildings.map(building => (
                  <div
                    key={building.id}
                    className={`p-3 rounded-lg border cursor-pointer transition-colors ${
                      selectedBuilding?.id === building.id 
                        ? 'bg-blue-50 border-blue-200' 
                        : 'hover:bg-slate-50'
                    }`}
                    onClick={() => setSelectedBuilding(building)}
                  >
                    <div className="flex justify-between items-start">
                      <div>
                        <div className="font-medium">{building.code}</div>
                        <div className="text-sm text-slate-600">{building.name}</div>
                      </div>
                      <MapPin className="h-4 w-4 text-slate-400" />
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {selectedBuilding && (
            <Card>
              <CardHeader>
                <CardTitle>Building Details</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div>
                    <div className="font-medium">{selectedBuilding.name}</div>
                    <div className="text-sm text-slate-600">Code: {selectedBuilding.code}</div>
                  </div>
                  
                  <div>
                    <div className="text-sm font-medium mb-1">Departments:</div>
                    <div className="flex flex-wrap gap-1">
                      {selectedBuilding.departments.map(dept => (
                        <Badge key={dept} variant="secondary">{dept}</Badge>
                      ))}
                    </div>
                  </div>
                  
                  {selectedBuilding.accessibility && (
                    <Badge variant="outline" className="text-green-700 border-green-200">
                      Wheelchair Accessible
                    </Badge>
                  )}
                  
                  <div className="flex gap-2 pt-2">
                    <Button 
                      size="sm" 
                      variant="outline"
                      onClick={() => setRouteFrom(selectedBuilding)}
                    >
                      Route From
                    </Button>
                    <Button 
                      size="sm" 
                      variant="outline"
                      onClick={() => setRouteTo(selectedBuilding)}
                    >
                      Route To
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}
