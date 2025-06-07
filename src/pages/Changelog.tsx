
import { Layout } from "@/components/Layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const changelogEntries = [
  {
    version: "1.0.0",
    date: "2024-01-15",
    type: "major",
    title: "Initial Launch",
    description: "UofT Course Compass is now live with core features including course directory, academic planning, and timetable integration.",
    changes: [
      "Course directory with comprehensive search and filtering",
      "Academic planning and degree progress tracking", 
      "Timetable visualization and management",
      "Professor ratings and course reviews",
      "Multi-campus support (St. George, Mississauga, Scarborough)"
    ]
  }
];

export default function Changelog() {
  return (
    <Layout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-slate-900 mb-2">Changelog</h1>
          <p className="text-slate-600">Stay updated with the latest features and improvements</p>
        </div>

        <div className="space-y-6">
          {changelogEntries.map((entry, index) => (
            <Card key={index}>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <CardTitle className="text-xl">Version {entry.version}</CardTitle>
                    <Badge variant={entry.type === 'major' ? 'default' : 'secondary'}>
                      {entry.type}
                    </Badge>
                  </div>
                  <span className="text-slate-500">{entry.date}</span>
                </div>
                <h3 className="text-lg font-medium">{entry.title}</h3>
              </CardHeader>
              <CardContent>
                <p className="text-slate-700 mb-4">{entry.description}</p>
                <div>
                  <h4 className="font-medium mb-2">What's New:</h4>
                  <ul className="space-y-1">
                    {entry.changes.map((change, changeIndex) => (
                      <li key={changeIndex} className="flex items-start gap-2">
                        <span className="text-green-500 mt-1">•</span>
                        <span className="text-slate-700">{change}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </Layout>
  );
}
