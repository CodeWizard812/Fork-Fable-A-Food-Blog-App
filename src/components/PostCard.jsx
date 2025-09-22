import React from 'react';
import appwriteService from "../appwrite/config";
import { Link } from 'react-router';

function PostCard({ $id, title, featuredImage }) {
  return (
    <Link to={`/post/${$id}`}>
      <div className='w-full bg-white rounded-xl p-4 shadow-md hover:shadow-lg transition-shadow duration-300'>
        {/* 1. Image container:
             - 'overflow-hidden' ensures the image doesn't spill out.
             - 'mb-4' gives some space below the image.
             - 'rounded-xl' keeps the corners nice and soft.
             - 'h-48' sets a fixed height for the container. You can adjust this value (e.g., h-56, h-64) to your liking.
        */}
        <div className='w-full h-56 overflow-hidden mb-4 rounded-xl'>
          <img 
            src={appwriteService.getFilePreview(featuredImage)} 
            alt={title}
            /*
              2. Image styling:
                 - 'w-full' and 'h-full' make the image fill the container.
                 - 'object-cover' is the key. It scales the image to cover the entire container while maintaining its aspect ratio. Some parts of the image may be cropped to avoid distortion.
            */
            className='w-full h-full object-cover' 
          />
        </div>
        <h2 className='text-xl font-bold text-primary-color'>{title}</h2>
      </div>
    </Link>
  );
}

export default PostCard;