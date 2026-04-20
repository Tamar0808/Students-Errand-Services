import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import UserDashboard from "@/components/dashboards/user-dashboard";
import RunnerDashboard from "@/components/dashboards/runner-dashboard";

export default async function DashboardPage() {
  const session = await getServerSession(authOptions);

  if (!session?.user) {
    return <div>Loading...</div>;
  }

  if (session.user.role === "runner") {
    return <RunnerDashboard />;
  }

  return <UserDashboard />;
}
