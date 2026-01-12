import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { bidsApi } from '../../api/bids';
import { Navbar } from '../../components/layout/Navbar';
import type { Bid, Gig } from '../../types';

export const MyBidsPage: React.FC = () => {
  const { data: bids, isLoading, error } = useQuery({
    queryKey: ['my-bids'],
    queryFn: bidsApi.getMyBids,
  });

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <div className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold text-gray-800 mb-8">My Bids</h1>

        {isLoading && (
          <div className="text-center py-12">
            <div className="text-xl text-gray-600">Loading your bids...</div>
          </div>
        )}

        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
            Error loading bids. Please try again.
          </div>
        )}

        {bids && bids.length === 0 && (
          <div className="text-center py-12">
            <div className="text-xl text-gray-600 mb-4">You haven't placed any bids yet.</div>
            <a
              href="/gigs"
              className="inline-block bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition"
            >
              Browse Gigs
            </a>
          </div>
        )}

        <div className="space-y-6">
          {bids?.map((bid) => {
            const gig = typeof bid.gigId === 'object' ? bid.gigId as Gig : null;
            
            return (
              <div
                key={bid._id}
                className="bg-white rounded-lg shadow-md p-6 border border-gray-200"
              >
                <div className="flex justify-between items-start mb-4">
                  <div className="flex-1">
                    {gig && (
                      <>
                        <h2 className="text-xl font-bold text-gray-800 mb-1">
                          {gig.title}
                        </h2>
                        <p className="text-gray-600 text-sm mb-2">
                          Budget: ${gig.budget} • Status: {gig.status}
                        </p>
                      </>
                    )}
                    <p className="text-sm text-gray-500">
                      Bid placed on {new Date(bid.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="text-right">
                      <div className="text-sm text-gray-500">Your Bid</div>
                      <div className="text-2xl font-bold text-blue-600">${bid.price}</div>
                    </div>
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-semibold ${
                        bid.status === 'hired'
                          ? 'bg-green-100 text-green-800'
                          : bid.status === 'rejected'
                          ? 'bg-red-100 text-red-800'
                          : 'bg-yellow-100 text-yellow-800'
                      }`}
                    >
                      {bid.status.charAt(0).toUpperCase() + bid.status.slice(1)}
                    </span>
                  </div>
                </div>

                <div className="mb-4">
                  <h3 className="text-sm font-semibold text-gray-700 mb-2">Your Proposal</h3>
                  <p className="text-gray-600 whitespace-pre-wrap">{bid.message}</p>
                </div>

                {bid.status === 'hired' && (
                  <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                    <p className="text-green-800 font-semibold">
                      🎉 Congratulations! You've been hired for this gig!
                    </p>
                  </div>
                )}

                {bid.status === 'rejected' && (
                  <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
                    <p className="text-gray-600">
                      This bid was not selected. Keep trying!
                    </p>
                  </div>
                )}

                {gig && (
                  <a
                    href={`/gigs/${gig._id}`}
                    className="mt-4 inline-block text-blue-600 hover:text-blue-700 text-sm font-semibold"
                  >
                    View Gig Details →
                  </a>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};