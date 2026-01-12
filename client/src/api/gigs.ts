import api from './axios';
import type { Gig } from '../types';

export const gigsApi = {
  getGigs: async (search?: string): Promise<Gig[]> => {
    const response = await api.get<Gig[]>('/gigs', {
      params: search ? { search } : undefined,
    });
    return response.data;
  },

  getGigById: async (id: string): Promise<Gig> => {
    const response = await api.get<Gig>(`/gigs/${id}`);
    return response.data;
  },

  getMyGigs: async (): Promise<Gig[]> => {
    const response = await api.get<Gig[]>('/gigs/my-gigs');
    return response.data;
  },

  createGig: async (data: { title: string; description: string; budget: number }): Promise<Gig> => {
    const response = await api.post<Gig>('/gigs', data);
    return response.data;
  },
};