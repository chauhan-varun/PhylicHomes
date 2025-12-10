"use server";

import { auth } from "@/lib/auth";
import { cookies, headers } from "next/headers";
import { redirect } from "next/navigation";

export async function loginAction(prevState, formData) {
  const email = formData.get("email");
  const password = formData.get("password");

  if (!email || !password) {
    return { error: "Email and password are required" };
  }

  try {
    const response = await auth.api.signInEmail({
      body: {
        email,
        password,
      },
      headers: await headers(),
      asResponse: true,
    });

    if (!response.ok) {
      const data = await response.json();
      return { error: data.message || "Invalid email or password" };
    }

    // Get user data from response
    const data = await response.json();
    const userRole = data?.user?.role || "user";

    // Set cookies from the response
    const setCookieHeader = response.headers.get("set-cookie");
    if (setCookieHeader) {
      const cookieStore = await cookies();
      // Parse and set each cookie
      const cookieParts = setCookieHeader.split(/,(?=\s*\w+=)/);
      for (const cookie of cookieParts) {
        const [cookieValue] = cookie.split(";");
        const [name, ...valueParts] = cookieValue.split("=");
        const value = valueParts.join("=");
        if (name && value) {
          cookieStore.set(name.trim(), value.trim(), {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "lax",
            path: "/",
          });
        }
      }
    }

    // Redirect based on user role
    if (userRole === "admin") {
      redirect("/admin/dashboard");
    } else {
      redirect("/dashboard");
    }
  } catch (error) {
    if (error?.digest?.startsWith("NEXT_REDIRECT")) {
      throw error;
    }
    return { error: error.message || "An error occurred during login" };
  }
}

export async function signupAction(prevState, formData) {
  const name = formData.get("name");
  const email = formData.get("email");
  const password = formData.get("password");

  if (!name || !email || !password) {
    return { error: "All fields are required" };
  }

  try {
    const response = await auth.api.signUpEmail({
      body: {
        name,
        email,
        password,
      },
      headers: await headers(),
      asResponse: true,
    });

    if (!response.ok) {
      const data = await response.json();
      return { error: data.message || "Signup failed" };
    }

    // Set cookies from the response
    const setCookieHeader = response.headers.get("set-cookie");
    if (setCookieHeader) {
      const cookieStore = await cookies();
      // Parse and set each cookie
      const cookieParts = setCookieHeader.split(/,(?=\s*\w+=)/);
      for (const cookie of cookieParts) {
        const [cookieValue] = cookie.split(";");
        const [name, ...valueParts] = cookieValue.split("=");
        const value = valueParts.join("=");
        if (name && value) {
          cookieStore.set(name.trim(), value.trim(), {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "lax",
            path: "/",
          });
        }
      }
    }
  } catch (error) {
    if (error?.digest?.startsWith("NEXT_REDIRECT")) {
      throw error;
    }
    return { error: error.message || "An error occurred during signup" };
  }

  redirect("/dashboard");
}

export async function logoutAction() {
  await auth.api.signOut({
    headers: await headers(),
  });
  redirect("/signin");
}
