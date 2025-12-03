import React from 'react';
import appwriteService from "../appwrite/config";
import { Link } from 'react-router';

function PostCard({ $id, title, featuredImage, userName, $createdAt }) {
  return (
    <Link to={`/post/${$id}`}>
      <div className='w-full bg-white rounded-xl p-4 shadow-md hover:shadow-lg transition-shadow duration-300 h-full'>
        <div className="flex items-center gap-2 mb-3">
            <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-gray-500 text-sm font-bold">
                 {userName ? userName.charAt(0).toUpperCase() : "?"}
            </div>
            <span className="font-semibold text-gray-700 text-sm">
                {userName || "Author"}
            </span>
            <span className="text-xs text-gray-400">
                {$createdAt ? new Date($createdAt).toLocaleDateString("en-US", {
                            day: 'numeric',
                            month: 'short',
                            year: 'numeric'
                        }) : "Date N/A"}
            </span>
        </div>

        <div className='w-full aspect-video overflow-hidden mb-4 rounded-xl relative'>
          <img 
            src={appwriteService.getFilePreview(featuredImage)} 
            alt={title}
            className='w-full h-full object-cover' 
          />
        </div>
        <h2 className='text-xl font-bold text-primary-color'>{title}</h2>
      </div>
    </Link>
  );
}

export default PostCard;