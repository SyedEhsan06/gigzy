import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { gigsApi } from '../../api/gigs';
import { bidsApi } from '../../api/bids';
import { useAuth } from '../../contexts/AuthContext';
import { Navbar } from '../../components/layout/Navbar';
import { BidsList } from '../../components/bids/BidsList';

export const GigDetailsPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { user } = useAuth();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const [message, setMessage] = useState('');
  const [price, setPrice] = useState('');

  const { data: gig, isLoading: gigLoading } = useQuery({
    queryKey: ['gig', id],
    queryFn: () => gigsApi.getGigById(id!),
    enabled: !!id,
  });

  // Only fetch user bids if user is logged in
  const { data: userBids } = useQuery({
    queryKey: ['user-bids'],
    queryFn: () => bidsApi.getMyBids(),
    enabled: !!user,
  });

  const createBidMutation = useMutation({
    mutationFn: bidsApi.createBid,
    onSuccess: () => {
      toast.success('Bid submitted successfully!');
      setMessage('');
      setPrice('');
      queryClient.invalidateQueries({ queryKey: ['gig', id] });
      queryClient.invalidateQueries({ queryKey: ['user-bids'] });
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.message || 'Failed to submit bid');
    },
  });

  const handleSubmitBid = (e: React.FormEvent) => {
    e.preventDefault();

    if (!message.trim() || !price) {
      toast.error('Please fill in all fields');
      return;
    }

    if (Number(price) <= 0) {
      toast.error('Price must be greater than 0');
      return;
    }

    createBidMutation.mutate({
      gigId: id!,
      message: message.trim(),
      price: Number(price),
    });
  };

  if (gigLoading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-200 rounded w-48 mb-6"></div>
            <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
              <div className="h-12 bg-gray-200 rounded mb-4"></div>
              <div className="h-4 bg-gray-200 rounded mb-2"></div>
              <div className="h-4 bg-gray-200 rounded mb-6"></div>
              <div className="h-8 bg-gray-200 rounded w-24"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!gig) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center text-gray-500">Gig not found</div>
        </div>
      </div>
    );
  }

  // Computed values for cleaner logic
  const isOwner = user && gig.ownerId && (
    typeof gig.ownerId === 'object' 
      ? (gig.ownerId as any)._id === user._id 
      : gig.ownerId === user._id
  );
  const isAlreadyBidder = userBids?.some(bid => bid.gigId === id);
  const userHasBid = userBids?.some(bid => bid.gigId === id);
  const canBid = user && !isOwner && gig.status === 'open';
  const showBidForm = canBid && userBids && !userHasBid;
  const showBidSubmitted = canBid && userHasBid;
  const showOwnerMessage = isOwner && gig.status === 'open';

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        <button
          onClick={() => navigate('/gigs')}
          className="mb-6 text-blue-600 hover:text-blue-700 flex items-center gap-2 transition-colors"
        >
          ← Back to Gigs
        </button>

        {/* Gig Details Card */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 sm:p-8 mb-6">
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-4 mb-6">
            <div className="flex-1">
              <h1 className="text-2xl sm:text-4xl font-bold text-gray-900 mb-2">{gig.title}</h1>
              {gig.ownerId && typeof gig.ownerId === 'object' && (
                <p className="text-gray-600 text-sm sm:text-base">
                  Posted by {(gig.ownerId as any).name}
                </p>
              )}
            </div>
            <span
              className={`px-3 py-1 rounded-full text-xs sm:text-sm font-medium self-start ${
                gig.status === 'open'
                  ? 'bg-green-100 text-green-800'
                  : 'bg-gray-100 text-gray-800'
              }`}
            >
              {gig.status === 'open' ? 'Open' : 'Assigned'}
            </span>
          </div>

          <div className="space-y-4">
            <div>
              <h2 className="text-lg font-semibold text-gray-900 mb-2">Description</h2>
              <p className="text-gray-700 whitespace-pre-wrap text-sm sm:text-base leading-relaxed">
                {gig.description}
              </p>
            </div>

            <div>
              <h2 className="text-lg font-semibold text-gray-900 mb-2">Budget</h2>
              <div className="text-2xl sm:text-3xl font-bold text-blue-600">${gig.budget}</div>
            </div>

            <div className="text-xs sm:text-sm text-gray-500 pt-2 border-t border-gray-100">
              Posted on {new Date(gig.createdAt).toLocaleDateString()}
            </div>
          </div>
        </div>

        {/* Bid Form */}
        {showBidForm && (
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 sm:p-8 mb-6">
            <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-6">Submit Your Bid</h2>

            <form onSubmit={handleSubmitBid} className="space-y-6">
              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                  Your Proposal
                </label>
                <textarea
                  id="message"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  rows={4}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                  placeholder="Explain why you're the best fit for this gig..."
                />
              </div>

              <div>
                <label htmlFor="price" className="block text-sm font-medium text-gray-700 mb-2">
                  Your Bid Amount ($)
                </label>
                <input
                  type="number"
                  id="price"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  min="1"
                  step="0.01"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Enter your bid amount"
                />
              </div>

              <button
                type="submit"
                disabled={createBidMutation.isPending}
                className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {createBidMutation.isPending ? 'Submitting...' : 'Submit Bid'}
              </button>
            </form>
          </div>
        )}

        {/* Bid Submitted Message */}
        {showBidSubmitted && (
          <div className="bg-green-50 border border-green-200 rounded-lg p-4 sm:p-6 mb-6">
            <div className="flex items-center gap-3">
              <svg className="w-5 h-5 sm:w-6 sm:h-6 text-green-600 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <div>
                <h3 className="text-lg font-semibold text-green-900">Bid Submitted!</h3>
                <p className="text-green-700 text-sm sm:text-base">You have already submitted a bid for this gig. The gig owner will review all bids and get back to you soon.</p>
              </div>
            </div>
          </div>
        )}

        {/* Owner Message */}
        {showOwnerMessage && (
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 sm:p-6 mb-6">
            <div className="flex items-center gap-3">
              <svg className="w-5 h-5 sm:w-6 sm:h-6 text-blue-600 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <div>
                <h3 className="text-lg font-semibold text-blue-900">You own this gig</h3>
                <p className="text-blue-700 text-sm sm:text-base">You cannot submit bids on your own gigs. View and manage bids from freelancers below.</p>
              </div>
            </div>
          </div>
        )}

        {/* Bids List */}
        {user && <BidsList gigId={gig._id} currentUser={user} isOwner={!!isOwner} />}
      </div>
    </div>
  );
};