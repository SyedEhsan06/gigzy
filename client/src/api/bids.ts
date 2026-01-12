import api from './axios';
import type { Bid } from '../types';

export const bidsApi = {
  createBid: async (data: { gigId: string; message: string; price: number }): Promise<Bid> => {
    const response = await api.post<Bid>('/bids', data);
    return response.data;
  },

  getMyBids: async (): Promise<Bid[]> => {
    const response = await api.get<Bid[]>('/bids/my-bids');
    return response.data;
  },

  getBidsForGig: async (gigId: string): Promise<Bid[]> => {
    const response = await api.get<Bid[]>(`/bids/${gigId}`);
    return response.data;
  },

  hireBid: async (bidId: string): Promise<{ message: string }> => {
    const response = await api.patch<{ message: string }>(`/bids/${bidId}/hire`);
    return response.data;
  },

  rejectBid: async (bidId: string): Promise<{ message: string }> => {
    const response = await api.patch<{ message: string }>(`/bids/${bidId}/reject`);
    return response.data;
  },

  withdrawBid: async (bidId: string): Promise<{ message: string }> => {
    const response = await api.patch<{ message: string }>(`/bids/${bidId}/withdraw`);
    return response.data;
  },
};