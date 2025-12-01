import React from 'react';
import appwriteService from "../appwrite/config";
import { Link } from 'react-router';

function PostCard({ $id, title, featuredImage }) {
  return (
    <Link to={`/post/${$id}`}>
      <div className='w-full bg-white rounded-xl p-4 shadow-md hover:shadow-lg transition-shadow duration-300 h-full'>
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