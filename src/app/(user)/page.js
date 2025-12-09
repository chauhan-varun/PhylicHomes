import { requireRole } from "@/lib/roles";
import { logoutAction } from "@/lib/actions";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default async function UserDashboard() {
  const session = await requireRole(["user"]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 p-4">
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSA2MCAwIEwgMCAwIDAgNjAiIGZpbGw9Im5vbmUiIHN0cm9rZT0icmdiYSgyNTUsMjU1LDI1NSwwLjAzKSIgc3Ryb2tlLXdpZHRoPSIxIi8+PC9wYXR0ZXJuPjwvZGVmcz48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSJ1cmwoI2dyaWQpIi8+PC9zdmc+')] opacity-40"></div>

      <div className="relative max-w-4xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-white">Dashboard</h1>
            <p className="text-blue-200">Welcome back, {session.user.name}!</p>
          </div>
          <form action={logoutAction}>
            <Button
              type="submit"
              variant="outline"
              className="border-white/20 bg-white/10 text-white hover:bg-white/20"
            >
              Sign out
            </Button>
          </form>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card className="backdrop-blur-xl bg-white/10 border-white/20">
            <CardHeader className="pb-2">
              <CardDescription className="text-blue-200">
                Account Status
              </CardDescription>
              <CardTitle className="text-2xl text-white">Active</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center space-x-2">
                <div className="h-2 w-2 rounded-full bg-green-400 animate-pulse"></div>
                <span className="text-sm text-gray-300">Online</span>
              </div>
            </CardContent>
          </Card>

          <Card className="backdrop-blur-xl bg-white/10 border-white/20">
            <CardHeader className="pb-2">
              <CardDescription className="text-blue-200">Role</CardDescription>
              <CardTitle className="text-2xl text-white capitalize">
                {session.user.role || "User"}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-500/20 text-blue-300">
                Standard Access
              </span>
            </CardContent>
          </Card>

          <Card className="backdrop-blur-xl bg-white/10 border-white/20">
            <CardHeader className="pb-2">
              <CardDescription className="text-blue-200">Email</CardDescription>
              <CardTitle className="text-lg text-white truncate">
                {session.user.email}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <span
                className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${session.user.emailVerified ? "bg-green-500/20 text-green-300" : "bg-yellow-500/20 text-yellow-300"}`}
              >
                {session.user.emailVerified ? "Verified" : "Unverified"}
              </span>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <Card className="backdrop-blur-xl bg-white/10 border-white/20">
          <CardHeader>
            <CardTitle className="text-white">Your Dashboard</CardTitle>
            <CardDescription className="text-gray-300">
              This is your personal space. Only authenticated users with the
              &quot;user&quot; role can access this page.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2">
              <div className="p-4 rounded-lg bg-white/5 border border-white/10">
                <h3 className="font-semibold text-white mb-2">
                  🏠 Your Profile
                </h3>
                <p className="text-sm text-gray-300">
                  Manage your account settings and preferences.
                </p>
              </div>
              <div className="p-4 rounded-lg bg-white/5 border border-white/10">
                <h3 className="font-semibold text-white mb-2">
                  📊 Activity
                </h3>
                <p className="text-sm text-gray-300">
                  View your recent activity and history.
                </p>
              </div>
              <div className="p-4 rounded-lg bg-white/5 border border-white/10">
                <h3 className="font-semibold text-white mb-2">
                  🔔 Notifications
                </h3>
                <p className="text-sm text-gray-300">
                  Stay updated with the latest news.
                </p>
              </div>
              <div className="p-4 rounded-lg bg-white/5 border border-white/10">
                <h3 className="font-semibold text-white mb-2">⚙️ Settings</h3>
                <p className="text-sm text-gray-300">
                  Customize your experience.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
