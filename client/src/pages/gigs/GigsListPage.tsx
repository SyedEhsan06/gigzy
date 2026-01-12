"use client"

import type React from "react"
import { useState } from "react"
import { useQuery } from "@tanstack/react-query"
import { gigsApi } from "../../api/gigs"
import { GigCard } from "../../components/gigs/GigCard"
import { Navbar } from "../../components/layout/Navbar"

export const GigsListPage: React.FC = () => {
  const [search, setSearch] = useState("")
  const [searchQuery, setSearchQuery] = useState("")

  const {
    data: gigs,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["gigs", searchQuery],
    queryFn: () => gigsApi.getGigs(searchQuery || undefined),
  })

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    setSearchQuery(search)
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 via-white to-slate-50">
      <Navbar />

      <div className="container mx-auto px-4 py-12">
        <div className="mb-12">
          <h1 className="text-4xl font-bold text-foreground mb-2">Discover Gigs</h1>
          <p className="text-muted-foreground mb-8">Find amazing projects and start earning</p>

          <form onSubmit={handleSearch} className="flex gap-3">
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search gigs by title, skills..."
              className="flex-1 px-5 py-3 border border-border rounded-lg bg-white text-foreground placeholder-muted-foreground
                         transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent shadow-sm"
            />
            <button
              type="submit"
              className="px-8 py-3 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-all duration-200 font-semibold shadow-md hover:shadow-lg"
            >
              Search
            </button>
            {searchQuery && (
              <button
                type="button"
                onClick={() => {
                  setSearch("")
                  setSearchQuery("")
                }}
                className="px-6 py-3 bg-secondary text-secondary-foreground rounded-lg hover:bg-secondary/80 transition-all duration-200 font-medium"
              >
                Clear
              </button>
            )}
          </form>
        </div>

        {isLoading && (
          <div className="text-center py-16">
            <div className="text-lg text-muted-foreground">Loading incredible gigs...</div>
          </div>
        )}

        {error && (
          <div className="rounded-lg bg-destructive/10 border border-destructive/30 text-destructive px-6 py-4 text-sm mb-8">
            Error loading gigs. Please try again.
          </div>
        )}

        {gigs && gigs.length === 0 && (
          <div className="text-center py-16">
            <div className="text-lg text-muted-foreground mb-4">No gigs found.</div>
            {searchQuery && (
              <button
                onClick={() => {
                  setSearch("")
                  setSearchQuery("")
                }}
                className="text-primary hover:text-primary/80 font-semibold transition-colors"
              >
                Clear search and view all gigs
              </button>
            )}
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {gigs?.map((gig) => (
            <GigCard key={gig._id} gig={gig} />
          ))}
        </div>
      </div>
    </div>
  )
}
