
import { Layout } from "@/components/Layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function DropRates() {
  return (
    <Layout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-slate-900 mb-2">Course Drop Rates</h1>
          <p className="text-slate-600">Analyze course completion and drop rate statistics</p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Drop Rate Analytics</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-center py-12">
              <div className="text-slate-400 mb-4">
                <svg className="w-16 h-16 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
              </div>
              <h3 className="text-lg font-medium text-slate-900 mb-2">Drop Rate Data Coming Soon</h3>
              <p className="text-slate-600">
                Statistical analysis of course completion rates across departments and campuses.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
}
