import React from 'react';
import { Link } from 'react-router-dom';
import type { Gig, User } from '../../types';

interface GigCardProps {
  gig: Gig;
}

export const GigCard: React.FC<GigCardProps> = ({ gig }) => {
  const owner = typeof gig.ownerId === 'object' ? gig.ownerId as User : null;

  return (
    <Link
      to={`/gigs/${gig._id}`}
      className="block bg-white rounded-lg shadow-md hover:shadow-lg transition p-6 border border-gray-200"
    >
      <div className="flex justify-between items-start mb-4">
        <h3 className="text-xl font-bold text-gray-800">{gig.title}</h3>
        <span
          className={`px-3 py-1 rounded-full text-xs font-semibold ${
            gig.status === 'open'
              ? 'bg-green-100 text-green-800'
              : 'bg-gray-100 text-gray-800'
          }`}
        >
          {gig.status === 'open' ? 'Open' : 'Assigned'}
        </span>
      </div>

      <p className="text-gray-600 mb-4 line-clamp-2">{gig.description}</p>

      <div className="flex justify-between items-center">
        <div className="text-2xl font-bold text-blue-600">${gig.budget}</div>
        {owner && (
          <div className="text-sm text-gray-500">
            Posted by {owner.name}
          </div>
        )}
      </div>

      <div className="mt-4 text-xs text-gray-400">
        Posted {new Date(gig.createdAt).toLocaleDateString()}
      </div>
    </Link>
  );
};