"use client"

import * as React from "react"
import { LoaderCircle, Github } from "lucide-react"
import { useRouter } from "next/navigation"
import { useMutation } from "@tanstack/react-query"

import { supabase } from "@/lib/supabase"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

// Change interface to type alias to fix linter error
type UserAuthFormProps = React.HTMLAttributes<HTMLDivElement>

type LoginCredentials = {
  email: string
  password: string
}

export function UserAuthFormLogin({ className, ...props }: UserAuthFormProps) {
  const [email, setEmail] = React.useState<string>("")
  const [password, setPassword] = React.useState<string>("")
  const router = useRouter()

  // Email password login mutation
  const loginMutation = useMutation({
    mutationFn: async (credentials: LoginCredentials) => {
      const { data, error } = await supabase.auth.signInWithPassword(credentials)
      
      if (error) {
        throw new Error(error.message)
      }
      
      return data
    },
    onSuccess: () => {
      router.push("/home")
    }
  })

  // OAuth login mutation
  const oauthMutation = useMutation({
    mutationFn: async (provider: 'github') => {
      const { error } = await supabase.auth.signInWithOAuth({
        provider,
        options: {
          redirectTo: `${window.location.origin}/auth/callback`,
        },
      })
      
      if (error) {
        throw new Error(error.message)
      }
    }
  })

  // Determine if any mutation is loading
  const isLoading = loginMutation.isPending || oauthMutation.isPending
  
  // Determine error message from either mutation
  const error = loginMutation.error?.message || oauthMutation.error?.message || null

  async function onSubmit(event: React.SyntheticEvent) {
    event.preventDefault()
    loginMutation.mutate({ email, password })
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
          <div className="grid gap-1">
            <Label className="sr-only" htmlFor="password">
              Password
            </Label>
            <Input
              id="password"
              placeholder="Password"
              type="password"
              autoCapitalize="none"
              autoComplete="current-password"
              autoCorrect="off"
              disabled={isLoading}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <Button disabled={isLoading} type="submit">
            {loginMutation.isPending && (
              <LoaderCircle className="w-4 h-4 mr-2 animate-spin" />
            )}
            Sign In with Email
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
        onClick={() => oauthMutation.mutate('github')}
      >
        {oauthMutation.isPending ? (
          <LoaderCircle className="w-4 h-4 mr-2 animate-spin" />
        ) : (
          <Github className="w-4 h-4 mr-2" />
        )}{" "}
        GitHub
      </Button>
    </div>
  )
}