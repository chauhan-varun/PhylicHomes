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

export default async function AdminDashboard() {
  const session = await requireRole(["admin"]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-red-900 to-slate-900 p-4">
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSA2MCAwIEwgMCAwIDAgNjAiIGZpbGw9Im5vbmUiIHN0cm9rZT0icmdiYSgyNTUsMjU1LDI1NSwwLjAzKSIgc3Ryb2tlLXdpZHRoPSIxIi8+PC9wYXR0ZXJuPjwvZGVmcz48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSJ1cmwoI2dyaWQpIi8+PC9zdmc+')] opacity-40"></div>

      <div className="relative max-w-6xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-white flex items-center gap-2">
              <span className="inline-flex items-center justify-center h-8 w-8 rounded-lg bg-red-500/20">
                👑
              </span>
              Admin Dashboard
            </h1>
            <p className="text-red-200">
              Welcome, Administrator {session.user.name}
            </p>
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

        {/* Admin Badge */}
        <div className="flex items-center gap-2 p-3 rounded-lg bg-red-500/10 border border-red-500/20">
          <div className="h-2 w-2 rounded-full bg-red-400 animate-pulse"></div>
          <span className="text-sm text-red-200">
            You have full administrative privileges
          </span>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card className="backdrop-blur-xl bg-white/10 border-white/20">
            <CardHeader className="pb-2">
              <CardDescription className="text-red-200">
                Total Users
              </CardDescription>
              <CardTitle className="text-3xl text-white">1,234</CardTitle>
            </CardHeader>
            <CardContent>
              <span className="text-xs text-green-400">
                ↑ 12% from last month
              </span>
            </CardContent>
          </Card>

          <Card className="backdrop-blur-xl bg-white/10 border-white/20">
            <CardHeader className="pb-2">
              <CardDescription className="text-red-200">
                Active Sessions
              </CardDescription>
              <CardTitle className="text-3xl text-white">89</CardTitle>
            </CardHeader>
            <CardContent>
              <span className="text-xs text-gray-400">Real-time count</span>
            </CardContent>
          </Card>

          <Card className="backdrop-blur-xl bg-white/10 border-white/20">
            <CardHeader className="pb-2">
              <CardDescription className="text-red-200">
                Your Role
              </CardDescription>
              <CardTitle className="text-2xl text-white capitalize">
                {session.user.role}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-500/20 text-red-300">
                Full Access
              </span>
            </CardContent>
          </Card>

          <Card className="backdrop-blur-xl bg-white/10 border-white/20">
            <CardHeader className="pb-2">
              <CardDescription className="text-red-200">
                System Health
              </CardDescription>
              <CardTitle className="text-2xl text-white">98%</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="w-full bg-white/10 rounded-full h-2">
                <div
                  className="bg-green-400 h-2 rounded-full"
                  style={{ width: "98%" }}
                ></div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Admin Features */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card className="backdrop-blur-xl bg-white/10 border-white/20">
            <CardHeader>
              <CardTitle className="text-white">User Management</CardTitle>
              <CardDescription className="text-gray-300">
                Manage users, roles, and permissions
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-center justify-between p-3 rounded-lg bg-white/5 hover:bg-white/10 transition-colors cursor-pointer">
                <div className="flex items-center gap-3">
                  <span className="text-xl">👥</span>
                  <span className="text-white">View All Users</span>
                </div>
                <span className="text-gray-400">→</span>
              </div>
              <div className="flex items-center justify-between p-3 rounded-lg bg-white/5 hover:bg-white/10 transition-colors cursor-pointer">
                <div className="flex items-center gap-3">
                  <span className="text-xl">🔐</span>
                  <span className="text-white">Role Management</span>
                </div>
                <span className="text-gray-400">→</span>
              </div>
              <div className="flex items-center justify-between p-3 rounded-lg bg-white/5 hover:bg-white/10 transition-colors cursor-pointer">
                <div className="flex items-center gap-3">
                  <span className="text-xl">🚫</span>
                  <span className="text-white">Ban/Unban Users</span>
                </div>
                <span className="text-gray-400">→</span>
              </div>
            </CardContent>
          </Card>

          <Card className="backdrop-blur-xl bg-white/10 border-white/20">
            <CardHeader>
              <CardTitle className="text-white">System Settings</CardTitle>
              <CardDescription className="text-gray-300">
                Configure system-wide settings
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-center justify-between p-3 rounded-lg bg-white/5 hover:bg-white/10 transition-colors cursor-pointer">
                <div className="flex items-center gap-3">
                  <span className="text-xl">⚙️</span>
                  <span className="text-white">General Settings</span>
                </div>
                <span className="text-gray-400">→</span>
              </div>
              <div className="flex items-center justify-between p-3 rounded-lg bg-white/5 hover:bg-white/10 transition-colors cursor-pointer">
                <div className="flex items-center gap-3">
                  <span className="text-xl">🔒</span>
                  <span className="text-white">Security Settings</span>
                </div>
                <span className="text-gray-400">→</span>
              </div>
              <div className="flex items-center justify-between p-3 rounded-lg bg-white/5 hover:bg-white/10 transition-colors cursor-pointer">
                <div className="flex items-center gap-3">
                  <span className="text-xl">📊</span>
                  <span className="text-white">Analytics</span>
                </div>
                <span className="text-gray-400">→</span>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Account Info */}
        <Card className="backdrop-blur-xl bg-white/10 border-white/20">
          <CardHeader>
            <CardTitle className="text-white">Your Admin Account</CardTitle>
            <CardDescription className="text-gray-300">
              Your account details and session information
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="p-4 rounded-lg bg-white/5">
                <p className="text-sm text-gray-400">Name</p>
                <p className="text-white font-medium">{session.user.name}</p>
              </div>
              <div className="p-4 rounded-lg bg-white/5">
                <p className="text-sm text-gray-400">Email</p>
                <p className="text-white font-medium">{session.user.email}</p>
              </div>
              <div className="p-4 rounded-lg bg-white/5">
                <p className="text-sm text-gray-400">Role</p>
                <p className="text-white font-medium capitalize">{session.user.role}</p>
              </div>
              <div className="p-4 rounded-lg bg-white/5">
                <p className="text-sm text-gray-400">Email Status</p>
                <p className="text-white font-medium">
                  {session.user.emailVerified ? "✅ Verified" : "⚠️ Unverified"}
                </p>
              </div>
              <div className="p-4 rounded-lg bg-white/5 md:col-span-2 lg:col-span-4">
                <p className="text-sm text-gray-400">User ID</p>
                <p className="text-white font-medium font-mono text-sm">{session.user.id}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
