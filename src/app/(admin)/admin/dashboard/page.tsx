import CardData from "@/components/card/card-data";
import { getDashboardData } from "@/lib/actions/actions-dashboard";
import { FileText, Info, List, TriangleAlert, WrenchIcon } from "lucide-react";

export const metadata = {
  title: "Admin Dashboard | Utilify App",
  description: "Utilify App Dashboard for admin",
};

interface iLog {
  id: string;
  action: string;
}

const AdminDashboardPage = async () => {
  const { auditLogs, toolCount, loanRequestCount, loanListCount } =
    await getDashboardData();

  return (
    <div className="my-4">
      <h1 className="my-4 text-2xl font-semibold tracking-wider">
        Welcome to Utilify
      </h1>
      <div>
        <h2 className="my-2 text-lg font-semibold">Overview</h2>
        <div className="grid max-w-[1000px] grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3">
          {toolCount !== undefined && (
            <CardData countData={`${toolCount} Tools`} variant="primary">
              <>
                <WrenchIcon />
                <span>All Tools</span>
              </>
            </CardData>
          )}
          {loanRequestCount !== undefined && (
            <CardData
              countData={`${loanRequestCount} Requests`}
              variant="warning"
            >
              <>
                <FileText />
                <span>All Loan Requests</span>
              </>
            </CardData>
          )}
          {loanListCount !== undefined && (
            <CardData countData={`${loanListCount} Loans`} variant="success">
              <>
                <List />
                <span>All Loans</span>
              </>
            </CardData>
          )}
        </div>
        <div className="my-6 max-w-[1500px] space-y-4">
          <h2 className="my-2 text-lg font-semibold">Recent Activity</h2>
          {auditLogs && auditLogs?.length > 0 ? (
            <div className="space-y-4">
              {auditLogs.map((log: iLog) => (
                <CardData key={log.id} isWithCount={false} variant="secondary">
                  <>
                    <Info />
                    <span className="sm:text-md text-sm">{log.action}</span>
                  </>
                </CardData>
              ))}
            </div>
          ) : (
            <CardData isWithCount={false} variant="secondary">
              <>
                <TriangleAlert />
                <span>No recent activity</span>
              </>
            </CardData>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboardPage;
