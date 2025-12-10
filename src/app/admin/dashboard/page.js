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
    <div className="min-h-screen bg-white p-8">
      <div className="max-w-6xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex justify-between items-center border-b border-gray-200 pb-6">
          <div>
            <h1 className="text-3xl font-bold text-black flex items-center gap-2">
              <span className="inline-flex items-center justify-center h-8 w-8 rounded-lg bg-gray-100">
                👑
              </span>
              Admin Dashboard
            </h1>
            <p className="text-gray-600">
              Welcome, Administrator {session.user.name}
            </p>
          </div>
          <form action={logoutAction}>
            <Button
              type="submit"
              variant="outline"
              className="border-black text-black hover:bg-gray-100"
            >
              Sign out
            </Button>
          </form>
        </div>

        {/* Admin Badge */}
        <div className="flex items-center gap-2 p-3 rounded-lg bg-gray-50 border border-gray-200">
          <div className="h-2 w-2 rounded-full bg-green-500 animate-pulse"></div>
          <span className="text-sm text-gray-700">
            You have full administrative privileges
          </span>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card className="border border-gray-200">
            <CardHeader className="pb-2">
              <CardDescription className="text-gray-500">
                Total Users
              </CardDescription>
              <CardTitle className="text-3xl text-black">1,234</CardTitle>
            </CardHeader>
            <CardContent>
              <span className="text-xs text-green-600">
                ↑ 12% from last month
              </span>
            </CardContent>
          </Card>

          <Card className="border border-gray-200">
            <CardHeader className="pb-2">
              <CardDescription className="text-gray-500">
                Active Sessions
              </CardDescription>
              <CardTitle className="text-3xl text-black">89</CardTitle>
            </CardHeader>
            <CardContent>
              <span className="text-xs text-gray-500">Real-time count</span>
            </CardContent>
          </Card>

          <Card className="border border-gray-200">
            <CardHeader className="pb-2">
              <CardDescription className="text-gray-500">
                Your Role
              </CardDescription>
              <CardTitle className="text-2xl text-black capitalize">
                {session.user.role}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                Full Access
              </span>
            </CardContent>
          </Card>

          <Card className="border border-gray-200">
            <CardHeader className="pb-2">
              <CardDescription className="text-gray-500">
                System Health
              </CardDescription>
              <CardTitle className="text-2xl text-black">98%</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className="bg-black h-2 rounded-full"
                  style={{ width: "98%" }}
                ></div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Admin Features */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card className="border border-gray-200">
            <CardHeader>
              <CardTitle className="text-black">User Management</CardTitle>
              <CardDescription className="text-gray-600">
                Manage users, roles, and permissions
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-center justify-between p-3 rounded-lg border border-gray-200 hover:bg-gray-50 transition-colors cursor-pointer">
                <div className="flex items-center gap-3">
                  <span className="text-xl">👥</span>
                  <span className="text-black">View All Users</span>
                </div>
                <span className="text-gray-400">→</span>
              </div>
              <div className="flex items-center justify-between p-3 rounded-lg border border-gray-200 hover:bg-gray-50 transition-colors cursor-pointer">
                <div className="flex items-center gap-3">
                  <span className="text-xl">🔐</span>
                  <span className="text-black">Role Management</span>
                </div>
                <span className="text-gray-400">→</span>
              </div>
              <div className="flex items-center justify-between p-3 rounded-lg border border-gray-200 hover:bg-gray-50 transition-colors cursor-pointer">
                <div className="flex items-center gap-3">
                  <span className="text-xl">🚫</span>
                  <span className="text-black">Ban/Unban Users</span>
                </div>
                <span className="text-gray-400">→</span>
              </div>
            </CardContent>
          </Card>

          <Card className="border border-gray-200">
            <CardHeader>
              <CardTitle className="text-black">System Settings</CardTitle>
              <CardDescription className="text-gray-600">
                Configure system-wide settings
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-center justify-between p-3 rounded-lg border border-gray-200 hover:bg-gray-50 transition-colors cursor-pointer">
                <div className="flex items-center gap-3">
                  <span className="text-xl">⚙️</span>
                  <span className="text-black">General Settings</span>
                </div>
                <span className="text-gray-400">→</span>
              </div>
              <div className="flex items-center justify-between p-3 rounded-lg border border-gray-200 hover:bg-gray-50 transition-colors cursor-pointer">
                <div className="flex items-center gap-3">
                  <span className="text-xl">🔒</span>
                  <span className="text-black">Security Settings</span>
                </div>
                <span className="text-gray-400">→</span>
              </div>
              <div className="flex items-center justify-between p-3 rounded-lg border border-gray-200 hover:bg-gray-50 transition-colors cursor-pointer">
                <div className="flex items-center gap-3">
                  <span className="text-xl">📊</span>
                  <span className="text-black">Analytics</span>
                </div>
                <span className="text-gray-400">→</span>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Account Info */}
        <Card className="border border-gray-200">
          <CardHeader>
            <CardTitle className="text-black">Your Admin Account</CardTitle>
            <CardDescription className="text-gray-600">
              Your account details and session information
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="p-4 border border-gray-200 rounded-lg">
                <p className="text-sm text-gray-500">Name</p>
                <p className="text-black font-medium">{session.user.name}</p>
              </div>
              <div className="p-4 border border-gray-200 rounded-lg">
                <p className="text-sm text-gray-500">Email</p>
                <p className="text-black font-medium">{session.user.email}</p>
              </div>
              <div className="p-4 border border-gray-200 rounded-lg">
                <p className="text-sm text-gray-500">Role</p>
                <p className="text-black font-medium capitalize">{session.user.role}</p>
              </div>
              <div className="p-4 border border-gray-200 rounded-lg">
                <p className="text-sm text-gray-500">Email Status</p>
                <p className="text-black font-medium">
                  {session.user.emailVerified ? "Verified" : "Not verified"}
                </p>
              </div>
              <div className="p-4 border border-gray-200 rounded-lg md:col-span-2 lg:col-span-4">
                <p className="text-sm text-gray-500">User ID</p>
                <p className="text-black font-medium font-mono text-sm">{session.user.id}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
