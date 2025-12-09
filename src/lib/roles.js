import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { auth } from "./auth";

/**
 * Server-side role protection helper
 * @param {string[]} allowedRoles - Array of allowed roles for the route
 * @returns {Promise<{user: object, session: object}>} Session data if authorized
 */
export async function requireRole(allowedRoles) {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  // Not authenticated - redirect to login
  if (!session) {
    redirect("/login");
  }

  const userRole = session.user.role || "user";

  // Check if user has an allowed role
  if (!allowedRoles.includes(userRole)) {
    // Redirect based on their actual role
    if (userRole === "admin") {
      redirect("/admin");
    } else {
      redirect("/");
    }
  }

  return session;
}

/**
 * Get current session without redirecting
 * @returns {Promise<{user: object, session: object} | null>}
 */
export async function getServerSession() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  return session;
}
