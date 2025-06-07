
import { Layout } from "@/components/Layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";

export default function Feedback() {
  return (
    <Layout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-slate-900 mb-2">Feedback & Support</h1>
          <p className="text-slate-600">Help us improve UofT Course Compass</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-center">Feature Request</CardTitle>
            </CardHeader>
            <CardContent className="text-center">
              <div className="mb-4">
                <svg className="w-12 h-12 mx-auto text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                </svg>
              </div>
              <p className="text-slate-600 mb-4">
                Suggest new features or improvements to make the platform better.
              </p>
              <Button className="w-full">Make Request</Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-center">General Feedback</CardTitle>
            </CardHeader>
            <CardContent className="text-center">
              <div className="mb-4">
                <svg className="w-12 h-12 mx-auto text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                </svg>
              </div>
              <p className="text-slate-600 mb-4">
                Share your thoughts and experiences using UofT Course Compass.
              </p>
              <Button className="w-full">Give Feedback</Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-center">Bug Report</CardTitle>
            </CardHeader>
            <CardContent className="text-center">
              <div className="mb-4">
                <svg className="w-12 h-12 mx-auto text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
                </svg>
              </div>
              <p className="text-slate-600 mb-4">
                Report technical issues or bugs you've encountered.
              </p>
              <Button className="w-full">Report Bug</Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </Layout>
  );
}
