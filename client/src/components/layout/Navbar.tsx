"use client"

import type React from "react"
import { Link, useNavigate } from "react-router-dom"
import toast from "react-hot-toast"
import { useAuth } from "../../contexts/AuthContext"
import { useState } from "react"

export const Navbar: React.FC = () => {
  const { user, logout } = useAuth()
  const navigate = useNavigate()
  const [menuOpen, setMenuOpen] = useState(false)

  const handleLogout = async () => {
    await logout()
    toast.success("Logged out successfully. See you soon!")
    navigate("/login")
    setMenuOpen(false)
  }

  const NavLink = ({ to, children }: { to: string; children: React.ReactNode }) => (
    <Link
      to={to}
      onClick={() => setMenuOpen(false)}
      className="text-foreground hover:text-primary transition-colors duration-200"
    >
      {children}
    </Link>
  )

  return (
    <nav className="bg-white border-b border-border shadow-sm sticky top-0 z-50">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link to="/gigs" className="text-2xl font-bold text-primary">
          GigFlow
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-6">
          {user ? (
            <>
              <NavLink to="/gigs">Browse Gigs</NavLink>
              
              <Link
                to="/post-gig"
                className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-4 py-2 rounded-lg font-semibold hover:from-blue-700 hover:to-purple-700 transition-all duration-200 shadow-md hover:shadow-lg transform hover:scale-105"
              >
                Post Gig
              </Link>

              <NavLink to="/my-gigs">My Gigs</NavLink>
              <NavLink to="/my-bids">My Bids</NavLink>

              <span className="text-sm text-muted-foreground">
                Hi, {user.name}
              </span>

              <button
                onClick={handleLogout}
                className="bg-destructive text-destructive-foreground px-4 py-2 rounded-lg hover:bg-destructive/90 transition"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <NavLink to="/login">Login</NavLink>
              <Link
                to="/register"
                className="bg-primary text-primary-foreground px-4 py-2 rounded-lg hover:bg-primary/90 transition"
              >
                Register
              </Link>
            </>
          )}
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="md:hidden inline-flex items-center justify-center rounded-lg border border-border p-2"
          aria-label="Toggle menu"
        >
          <svg
            className="h-6 w-6"
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
            viewBox="0 0 24 24"
          >
            {menuOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden border-t border-border bg-white">
          <div className="flex flex-col gap-4 px-4 py-4">
            {user ? (
              <>
                <NavLink to="/gigs">Browse Gigs</NavLink>
                
                <Link
                  to="/post-gig"
                  onClick={() => setMenuOpen(false)}
                  className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-4 py-2 rounded-lg font-semibold hover:from-blue-700 hover:to-purple-700 transition-all duration-200 shadow-md text-center"
                >
                  Post Gig
                </Link>

                <NavLink to="/my-gigs">My Gigs</NavLink>
                <NavLink to="/my-bids">My Bids</NavLink>

                <span className="text-sm text-muted-foreground">
                  Hi, {user.name}
                </span>

                <button
                  onClick={handleLogout}
                  className="bg-destructive text-destructive-foreground px-4 py-2 rounded-lg text-left"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <NavLink to="/login">Login</NavLink>
                <NavLink to="/register">Register</NavLink>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  )
}
