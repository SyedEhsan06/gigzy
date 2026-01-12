"use client"

import type React from "react"
import { useState } from "react"
import { useNavigate, Link } from "react-router-dom"
import { useMutation } from "@tanstack/react-query"
import toast from "react-hot-toast"
import { authApi } from "../../api/auth"
import { useAuth } from "../../contexts/AuthContext"

export const LoginPage: React.FC = () => {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const navigate = useNavigate()
  const { login } = useAuth()

  const loginMutation = useMutation({
    mutationFn: authApi.login,
    onSuccess: (data) => {
      login(data.user)
      toast.success("Welcome back! Logged in successfully.")
      navigate("/gigs")
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.message || "Login failed. Please try again.")
    },
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (!email || !password) {
      toast.error("Please fill in all fields")
      return
    }

    loginMutation.mutate({ email, password })
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 via-blue-50 to-slate-50 px-4">
      <div className="w-full max-w-md">
        <div className="bg-card rounded-2xl shadow-lg border border-border">
          {/* Header */}
          <div className="px-8 pt-8 pb-6 text-center border-b border-border">
            <h1 className="text-3xl font-bold text-foreground mb-2">Welcome Back</h1>
            <p className="text-muted-foreground text-sm">
              Sign in to your <span className="font-semibold text-primary">GigFlow</span> account
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="px-8 py-8 space-y-6">
            <div className="space-y-2.5">
              <label className="block text-sm font-semibold text-foreground">Email Address</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                className="w-full rounded-lg border border-border bg-input px-4 py-2.5 text-sm text-foreground placeholder-muted-foreground
                           transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
              />
            </div>

            <div className="space-y-2.5">
              <label className="block text-sm font-semibold text-foreground">Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full rounded-lg border border-border bg-input px-4 py-2.5 text-sm text-foreground placeholder-muted-foreground
                           transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
              />
            </div>

            <button
              type="submit"
              disabled={loginMutation.isPending}
              className="w-full rounded-lg bg-primary text-primary-foreground py-3 text-sm font-semibold
                         hover:bg-primary/90 transition-all duration-200 shadow-md hover:shadow-lg
                         disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {loginMutation.isPending ? "Signing in…" : "Sign In"}
            </button>
          </form>

          {/* Footer */}
          <div className="border-t border-border px-8 py-5 text-center text-sm text-muted-foreground">
            Don't have an account?{" "}
            <Link to="/register" className="font-semibold text-primary hover:text-primary/90 transition-colors">
              Create one
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
