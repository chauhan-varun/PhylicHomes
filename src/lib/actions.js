"use server";

import { auth } from "@/lib/auth";
import { headers } from "next/headers";
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
    });

    if (response.error) {
      return { error: response.error.message || "Login failed" };
    }

    // Get the user's role and redirect accordingly
    const userRole = response.user?.role || "user";

    if (userRole === "admin") {
      redirect("/admin");
    } else {
      redirect("/");
    }
  } catch (error) {
    // Handle redirect from catch block
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
    });

    if (response.error) {
      return { error: response.error.message || "Signup failed" };
    }

    redirect("/");
  } catch (error) {
    if (error?.digest?.startsWith("NEXT_REDIRECT")) {
      throw error;
    }
    return { error: error.message || "An error occurred during signup" };
  }
}

export async function logoutAction() {
  await auth.api.signOut({
    headers: await headers(),
  });
  redirect("/login");
}
