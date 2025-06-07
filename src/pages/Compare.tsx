
import { Layout } from "@/components/Layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function Compare() {
  return (
    <Layout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-slate-900 mb-2">Course Comparison</h1>
          <p className="text-slate-600">Compare courses side-by-side to make informed decisions</p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Course Comparison Tool</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-center py-12">
              <div className="text-slate-400 mb-4">
                <svg className="w-16 h-16 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                </svg>
              </div>
              <h3 className="text-lg font-medium text-slate-900 mb-2">Course Comparison Coming Soon</h3>
              <p className="text-slate-600">
                Compare multiple courses across ratings, requirements, and professor reviews.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
}
