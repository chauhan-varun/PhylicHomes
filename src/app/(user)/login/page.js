"use client";

import { useActionState } from "react";
import { loginAction, signupAction } from "@/lib/actions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { useState } from "react";

export default function LoginPage() {
  const [isLogin, setIsLogin] = useState(true);
  const [loginState, loginFormAction, loginPending] = useActionState(
    loginAction,
    null
  );
  const [signupState, signupFormAction, signupPending] = useActionState(
    signupAction,
    null
  );

  const state = isLogin ? loginState : signupState;
  const formAction = isLogin ? loginFormAction : signupFormAction;
  const isPending = isLogin ? loginPending : signupPending;

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 p-4">
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSA2MCAwIEwgMCAwIDAgNjAiIGZpbGw9Im5vbmUiIHN0cm9rZT0icmdiYSgyNTUsMjU1LDI1NSwwLjAzKSIgc3Ryb2tlLXdpZHRoPSIxIi8+PC9wYXR0ZXJuPjwvZGVmcz48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSJ1cmwoI2dyaWQpIi8+PC9zdmc+')] opacity-40"></div>

      <Card className="w-full max-w-md relative backdrop-blur-xl bg-white/10 border-white/20 shadow-2xl">
        <CardHeader className="space-y-1 text-center">
          <div className="mx-auto mb-4 h-12 w-12 rounded-full bg-gradient-to-tr from-purple-500 to-pink-500 flex items-center justify-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 text-white"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
              />
            </svg>
          </div>
          <CardTitle className="text-2xl font-bold text-white">
            {isLogin ? "Welcome back" : "Create an account"}
          </CardTitle>
          <CardDescription className="text-gray-300">
            {isLogin
              ? "Enter your credentials to access your account"
              : "Fill in your details to get started"}
          </CardDescription>
        </CardHeader>

        <form action={formAction}>
          <CardContent className="space-y-4">
            {state?.error && (
              <Alert
                variant="destructive"
                className="bg-red-500/20 border-red-500/50 text-red-200"
              >
                <AlertDescription>{state.error}</AlertDescription>
              </Alert>
            )}

            {!isLogin && (
              <div className="space-y-2">
                <Label htmlFor="name" className="text-gray-200">
                  Name
                </Label>
                <Input
                  id="name"
                  name="name"
                  type="text"
                  placeholder="John Doe"
                  required
                  className="bg-white/10 border-white/20 text-white placeholder:text-gray-400 focus:border-purple-400 focus:ring-purple-400"
                />
              </div>
            )}

            <div className="space-y-2">
              <Label htmlFor="email" className="text-gray-200">
                Email
              </Label>
              <Input
                id="email"
                name="email"
                type="email"
                placeholder="you@example.com"
                required
                className="bg-white/10 border-white/20 text-white placeholder:text-gray-400 focus:border-purple-400 focus:ring-purple-400"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="password" className="text-gray-200">
                Password
              </Label>
              <Input
                id="password"
                name="password"
                type="password"
                placeholder="••••••••"
                required
                className="bg-white/10 border-white/20 text-white placeholder:text-gray-400 focus:border-purple-400 focus:ring-purple-400"
              />
            </div>
          </CardContent>

          <CardFooter className="flex flex-col space-y-4">
            <Button
              type="submit"
              className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-semibold py-2.5 transition-all duration-200 shadow-lg hover:shadow-purple-500/25"
              disabled={isPending}
            >
              {isPending
                ? isLogin
                  ? "Signing in..."
                  : "Creating account..."
                : isLogin
                  ? "Sign in"
                  : "Create account"}
            </Button>

            <p className="text-sm text-gray-300 text-center">
              {isLogin ? "Don't have an account?" : "Already have an account?"}{" "}
              <button
                type="button"
                onClick={() => setIsLogin(!isLogin)}
                className="text-purple-400 hover:text-purple-300 font-medium underline-offset-4 hover:underline transition-colors"
              >
                {isLogin ? "Sign up" : "Sign in"}
              </button>
            </p>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
}
