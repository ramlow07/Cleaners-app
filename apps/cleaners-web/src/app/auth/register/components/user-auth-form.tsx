"use client";

import * as React from "react";
import { LoaderCircle, Github } from "lucide-react";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

import { createClient } from "@/utils/supabase/client";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

// Add members to interface or use type directly
type UserAuthFormProps = React.HTMLAttributes<HTMLDivElement> & {
  userRole?: string;
};

export function UserAuthFormRegister({
  userRole,
  className,
  ...props
}: UserAuthFormProps) {
  const [email, setEmail] = React.useState<string>("");
  const router = useRouter();
  const supabase = createClient();

  // Email signup mutation - updated to passwordless
  const emailSignup = useMutation({
    mutationFn: async ({ email }: { email: string }) => {
      return supabase.auth.signInWithOtp({
        email,
        options: {
          emailRedirectTo: `${window.location.origin}/auth/verify`,
          data: {
            role: userRole || "client",
          },
        },
      });
    },
    onSuccess: (data) => {
      if (data.data.user) {
        router.push("/auth/verification");
      }
    },
  });

  console.log("Selected role:", userRole);

  // GitHub OAuth mutation
  const githubSignIn = useMutation({
    mutationFn: async () => {
      return supabase.auth.signInWithOAuth({
        provider: "github",
        options: {
          redirectTo: `${window.location.origin}/auth/verify?role=${userRole}`, // getting userRole params from URL
        },
      });
    },
  });

  // Combined error from either mutation
  const error =
    emailSignup.error?.message || githubSignIn.error?.message || null;
  // Combined loading state
  const isLoading = emailSignup.isPending || githubSignIn.isPending;

  async function onSubmit(event: React.SyntheticEvent) {
    event.preventDefault();

    if (userRole) {
      localStorage.setItem("userRole", userRole);
    }

    emailSignup.mutate({ email });
  }

  return (
    <div className={cn("grid gap-6", className)} {...props}>
      <form onSubmit={onSubmit}>
        <div className="grid gap-2">
          {error && (
            <div className="p-3 text-sm text-red-500 rounded-md bg-red-50">
              {error}
            </div>
          )}
          <div className="grid gap-1">
            <Label className="sr-only" htmlFor="email">
              Email
            </Label>
            <Input
              id="email"
              placeholder="name@example.com"
              type="email"
              autoCapitalize="none"
              autoComplete="email"
              autoCorrect="off"
              disabled={isLoading}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <Button disabled={isLoading} type="submit">
            {isLoading && (
              <LoaderCircle className="w-4 h-4 mr-2 animate-spin" />
            )}
            Continue with Email
          </Button>
        </div>
      </form>
      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t" />
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="px-2 bg-background text-muted-foreground">
            Or continue with
          </span>
        </div>
      </div>
      <Button
        variant="outline"
        type="button"
        disabled={isLoading}
        onClick={() => githubSignIn.mutate()}
      >
        {isLoading ? (
          <LoaderCircle className="w-4 h-4 mr-2 animate-spin" />
        ) : (
          <Github className="w-4 h-4 mr-2" />
        )}{" "}
        GitHub
      </Button>
    </div>
  );
}
