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

export default async function DashboardPage() {
  const session = await requireRole(["user", "admin"]);

  return (
    <div className="min-h-screen bg-white p-8">
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex justify-between items-center border-b border-gray-200 pb-6">
          <div>
            <h1 className="text-3xl font-bold text-black">Dashboard</h1>
            <p className="text-gray-600">
              Welcome, <span className="font-semibold">{session.user.name}</span>!
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

        {/* User Info Card */}
        <Card className="border border-gray-200">
          <CardHeader>
            <CardTitle className="text-black">Your Profile</CardTitle>
            <CardDescription className="text-gray-600">
              Your account information
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
                <p className="text-black font-medium capitalize">{session.user.role || "user"}</p>
              </div>
              <div className="p-4 border border-gray-200 rounded-lg">
                <p className="text-sm text-gray-500">Email Status</p>
                <p className="text-black font-medium">
                  {session.user.emailVerified ? "Verified" : "Not verified"}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Welcome Message */}
        <Card className="border border-gray-200">
          <CardHeader>
            <CardTitle className="text-black">Hello, {session.user.name}!</CardTitle>
            <CardDescription className="text-gray-600">
              You are logged in successfully.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-gray-700">
              This is your personal dashboard. You can see your account details above.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
