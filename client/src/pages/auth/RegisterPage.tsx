"use client"

import type React from "react"
import { useState } from "react"
import { useNavigate, Link } from "react-router-dom"
import { useMutation } from "@tanstack/react-query"
import toast from "react-hot-toast"
import { authApi } from "../../api/auth"
import { useAuth } from "../../contexts/AuthContext"

export const RegisterPage: React.FC = () => {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const navigate = useNavigate()
  const { login } = useAuth()

  const registerMutation = useMutation({
    mutationFn: authApi.register,
    onSuccess: (user) => {
      login(user)
      toast.success("Account created successfully! Welcome to GigFlow.")
      navigate("/gigs")
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.message || "Registration failed. Please try again.")
    },
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (!name || !email || !password || !confirmPassword) {
      toast.error("Please fill in all fields")
      return
    }

    if (password !== confirmPassword) {
      toast.error("Passwords do not match")
      return
    }

    if (password.length < 6) {
      toast.error("Password must be at least 6 characters")
      return
    }

    registerMutation.mutate({ name, email, password })
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50 flex items-center justify-center px-4 relative overflow-hidden">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -left-40 w-80 h-80 bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute -bottom-40 -right-40 w-80 h-80 bg-accent/5 rounded-full blur-3xl" />
      </div>

      <div className="relative w-full max-w-md">
        <div className="bg-card rounded-2xl shadow-xl border border-border/40 backdrop-blur-sm">
          {/* Header */}
          <div className="px-8 pt-8 pb-6 text-center border-b border-border/30">
            <h1 className="text-3xl font-bold text-card-foreground mb-1">Join GigFlow</h1>
            <p className="text-muted-foreground text-sm">Create an account and start bidding on gigs today</p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="px-8 py-8 space-y-4">
            <div>
              <label htmlFor="name" className="block text-sm font-semibold text-card-foreground mb-2.5">
                Full Name
              </label>
              <input
                type="text"
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-4 py-2.5 border border-border rounded-lg bg-input text-card-foreground placeholder-muted-foreground text-sm
                           transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                placeholder="John Doe"
              />
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-semibold text-card-foreground mb-2.5">
                Email Address
              </label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-2.5 border border-border rounded-lg bg-input text-card-foreground placeholder-muted-foreground text-sm
                           transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                placeholder="you@example.com"
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-semibold text-card-foreground mb-2.5">
                Password
              </label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-2.5 border border-border rounded-lg bg-input text-card-foreground placeholder-muted-foreground text-sm
                           transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                placeholder="••••••••"
              />
            </div>

            <div>
              <label htmlFor="confirmPassword" className="block text-sm font-semibold text-card-foreground mb-2.5">
                Confirm Password
              </label>
              <input
                type="password"
                id="confirmPassword"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="w-full px-4 py-2.5 border border-border rounded-lg bg-input text-card-foreground placeholder-muted-foreground text-sm
                           transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                placeholder="••••••••"
              />
            </div>

            <button
              type="submit"
              disabled={registerMutation.isPending}
              className="w-full bg-primary text-primary-foreground py-3 rounded-lg font-semibold text-sm
                         hover:bg-primary/90 transition-all duration-200 shadow-lg hover:shadow-xl
                         disabled:opacity-60 disabled:cursor-not-allowed mt-2"
            >
              {registerMutation.isPending ? "Creating account..." : "Create Account"}
            </button>
          </form>

          {/* Footer */}
          <div className="border-t border-border/30 px-8 py-5 text-center text-sm text-muted-foreground">
            Already have an account?{" "}
            <Link to="/login" className="font-semibold text-primary hover:text-primary/90 transition-colors">
              Sign in
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
