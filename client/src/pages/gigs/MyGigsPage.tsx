import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { gigsApi } from '../../api/gigs';
import { Navbar } from '../../components/layout/Navbar';
import { GigCard } from '../../components/gigs/GigCard';

export const MyGigsPage: React.FC = () => {
  const { data: gigs, isLoading, error } = useQuery({
    queryKey: ['my-gigs'],
    queryFn: gigsApi.getMyGigs,
  });

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <div className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold text-gray-800 mb-8">My Posted Gigs</h1>

        {isLoading && (
          <div className="text-center py-12">
            <div className="text-xl text-gray-600">Loading your gigs...</div>
          </div>
        )}

        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
            Error loading gigs. Please try again.
          </div>
        )}

        {gigs && gigs.length === 0 && (
          <div className="text-center py-12">
            <div className="text-xl text-gray-600 mb-4">You haven't posted any gigs yet.</div>
            <a
              href="/post-gig"
              className="inline-block bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition"
            >
              Post Your First Gig
            </a>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {gigs?.map((gig) => (
            <GigCard key={gig._id} gig={gig} />
          ))}
        </div>
      </div>
    </div>
  );
};