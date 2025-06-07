
import { Layout } from "@/components/Layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function About() {
  return (
    <Layout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-slate-900 mb-2">About UofT Course Compass</h1>
          <p className="text-slate-600">Your comprehensive guide to University of Toronto academics</p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Our Mission</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-slate-700 mb-4">
              UofT Course Compass is designed to help University of Toronto students navigate their academic journey 
              with comprehensive course information, academic planning tools, and data-driven insights.
            </p>
            <p className="text-slate-700">
              We aggregate course data from all three UofT campuses to provide students with the information they 
              need to make informed decisions about their education.
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Features</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2 text-slate-700">
              <li>• Comprehensive course directory with search and filtering</li>
              <li>• Academic planning and degree progress tracking</li>
              <li>• Course prerequisite visualization</li>
              <li>• Professor ratings and reviews</li>
              <li>• Timetable integration and planning</li>
              <li>• Campus maps and building information</li>
              <li>• Historical course data and analytics</li>
            </ul>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
}
