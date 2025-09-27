import React, { useState, useEffect } from 'react'
import { Container, PostCard} from '../components'
import appwriteService from '../appwrite/config'
import { useSelector, useDispatch } from 'react-redux';
import { setPosts } from '../store/postSlice';

function AllPosts() {
    const posts = useSelector((state) => state.posts.posts);
    const authStatus = useSelector((state) => state.auth.status); // 2. Get auth status
    const dispatch = useDispatch();

    useEffect(() => {
        // Only fetch if posts are not already in the store
        if (posts.length === 0) {
            appwriteService.getPosts().then((response) => {
                if (response) {
                    dispatch(setPosts(response.rows));
                }
            });
        }
    }, [posts, dispatch]);

    // Case 1: User is NOT logged in
    if (!authStatus) {
        return (
            <div className="w-full py-8 mt-4 text-center">
                <Container>
                    <h1 className="text-2xl font-bold hover:text-gray-500">
                        Login to read posts
                    </h1>
                </Container>
            </div>
        );
    }

    // At this point, we know the user IS logged in.
    // Now we handle the data states.

    // Case 3: Logged in, loading finished, and there are no posts
    if (posts.length === 0) {
        return (
            <div className="w-full py-8 mt-4 text-center">
                <Container>
                    <h1 className="text-2xl font-bold hover:text-gray-500">
                        No post yet.
                    </h1>
                </Container>
            </div>
        );
    }
    
  return (
    <div className='w-full py-8'>
        <Container>
            <div className='flex flex-wrap'>
                {posts.map((post) =>(
                    <div key={post.$id} className='p-2 w-1/4'>
                        <PostCard {...post} /> 
                    </div>
                ))}
            </div>
        </Container>
    </div>
  )
}

export default AllPosts