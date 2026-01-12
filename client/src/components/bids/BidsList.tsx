import React from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { bidsApi } from '../../api/bids';
import type { Bid, User } from '../../types';

interface BidsListProps {
  gigId: string;
  currentUser?: User;
  isOwner?: boolean;
}

export const BidsList: React.FC<BidsListProps> = ({ gigId, currentUser, isOwner }) => {
  const queryClient = useQueryClient();

  const { data: bids, isLoading, error } = useQuery({
    queryKey: ['bids', gigId],
    queryFn: () => bidsApi.getBidsForGig(gigId),
  });

  const hireMutation = useMutation({
    mutationFn: bidsApi.hireBid,
    onSuccess: () => {
      toast.success('Freelancer hired successfully!');
      // Invalidate both gig and bids queries to refetch updated data
      queryClient.invalidateQueries({ queryKey: ['gig', gigId] });
      queryClient.invalidateQueries({ queryKey: ['bids', gigId] });
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.message || 'Failed to hire freelancer');
    },
  });

  const rejectMutation = useMutation({
    mutationFn: bidsApi.rejectBid,
    onSuccess: () => {
      toast.success('Bid rejected successfully!');
      // Invalidate both gig and bids queries to refetch updated data
      queryClient.invalidateQueries({ queryKey: ['gig', gigId] });
      queryClient.invalidateQueries({ queryKey: ['bids', gigId] });
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.message || 'Failed to reject bid');
    },
  });

  const withdrawMutation = useMutation({
    mutationFn: bidsApi.withdrawBid,
    onSuccess: () => {
      toast.success('Bid withdrawn successfully!');
      // Invalidate both gig and bids queries to refetch updated data
      queryClient.invalidateQueries({ queryKey: ['gig', gigId] });
      queryClient.invalidateQueries({ queryKey: ['bids', gigId] });
      queryClient.invalidateQueries({ queryKey: ['user-bids'] });
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.message || 'Failed to withdraw bid');
    },
  });

  // If user doesn't have permission to view bids, don't show anything
  if (error && (error as any).response?.status === 403) {
    return null;
  }

  const handleHire = (bidId: string) => {
    if (window.confirm('Are you sure you want to hire this freelancer? This action will reject all other bids.')) {
      hireMutation.mutate(bidId);
    }
  };

  const handleReject = (bidId: string) => {
    if (window.confirm('Are you sure you want to reject this bid? This action cannot be undone.')) {
      rejectMutation.mutate(bidId);
    }
  };

  const handleWithdraw = (bidId: string) => {
    if (window.confirm('Are you sure you want to withdraw your bid? This action cannot be undone.')) {
      withdrawMutation.mutate(bidId);
    }
  };

  if (isLoading) {
    return (
      <div className="bg-white rounded-lg shadow-lg p-8">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">Bids</h2>
        <div className="text-center text-gray-600">Loading bids...</div>
      </div>
    );
  }

  if (!bids || bids.length === 0) {
    return (
      <div className="bg-white rounded-lg shadow-lg p-8">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">Bids</h2>
        <div className="text-center text-gray-600">No bids yet.</div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-lg p-8">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">
        Bids ({bids.length})
      </h2>

      <div className="space-y-4">
        {bids.map((bid) => {
          const freelancer = typeof bid.freelancerId === 'object' ? bid.freelancerId as User : null;
          
          return (
            <div
              key={bid._id}
              className="border border-gray-200 rounded-lg p-6 hover:shadow-md transition"
            >
              <div className="flex justify-between items-start mb-4">
                <div>
                  {freelancer && (
                    <h3 className="text-lg font-semibold text-gray-800">
                      {freelancer.name}
                    </h3>
                  )}
                  <p className="text-sm text-gray-500">
                    {new Date(bid.createdAt).toLocaleDateString()}
                  </p>
                </div>
                <div className="flex items-center gap-4">
                  <div className="text-2xl font-bold text-blue-600">
                    ${bid.price}
                  </div>
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-semibold ${
                      bid.status === 'hired'
                        ? 'bg-green-100 text-green-800'
                        : bid.status === 'rejected'
                        ? 'bg-red-100 text-red-800'
                        : bid.status === 'withdrawn'
                        ? 'bg-gray-100 text-gray-800'
                        : 'bg-yellow-100 text-yellow-800'
                    }`}
                  >
                    {bid.status.charAt(0).toUpperCase() + bid.status.slice(1)}
                  </span>
                </div>
              </div>

              <div className="mb-4">
                <h4 className="text-sm font-semibold text-gray-700 mb-2">Proposal</h4>
                <p className="text-gray-600 whitespace-pre-wrap">{bid.message}</p>
              </div>

              {bid.status === 'pending' && (
                <div className="flex gap-3">
                  {currentUser && freelancer && currentUser._id === freelancer._id ? (
                    <button
                      onClick={() => handleWithdraw(bid._id)}
                      disabled={withdrawMutation.isPending}
                      className="w-full bg-orange-600 text-white py-2 rounded-lg font-semibold hover:bg-orange-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {withdrawMutation.isPending ? 'Withdrawing...' : 'Withdraw My Bid'}
                    </button>
                  ) : isOwner ? (
                    <>
                      <button
                        onClick={() => handleHire(bid._id)}
                        disabled={hireMutation.isPending || rejectMutation.isPending}
                        className="flex-1 bg-green-600 text-white py-2 rounded-lg font-semibold hover:bg-green-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        {hireMutation.isPending ? 'Hiring...' : 'Hire'}
                      </button>
                      <button
                        onClick={() => handleReject(bid._id)}
                        disabled={hireMutation.isPending || rejectMutation.isPending}
                        className="flex-1 bg-red-600 text-white py-2 rounded-lg font-semibold hover:bg-red-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        {rejectMutation.isPending ? 'Rejecting...' : 'Reject'}
                      </button>
                    </>
                  ) : null}
                </div>
              )}

              {bid.status === 'hired' && (
                <div className="bg-green-50 border border-green-200 rounded-lg p-4 text-center">
                  <p className="text-green-800 font-semibold">✓ You hired this freelancer</p>
                </div>
              )}

              {bid.status === 'rejected' && (
                <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 text-center">
                  <p className="text-gray-600">This bid was not selected</p>
                </div>
              )}

              {bid.status === 'withdrawn' && (
                <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 text-center">
                  <p className="text-gray-600">This bid was withdrawn by the freelancer</p>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};