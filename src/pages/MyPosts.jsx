import React, { useState, useEffect } from 'react'
import { Container, PostCard} from '../components'
import appwriteService from '../appwrite/config'
import { useSelector, useDispatch } from 'react-redux';
import { setPosts } from '../store/postSlice';

function MyPosts() {
    const allPosts = useSelector((state) => state.posts.posts);
    const userData = useSelector((state) => state.auth.userData);
    const authStatus = useSelector((state) => state.auth.status);
    const [userPosts, setUserPosts] = useState([]);

    useEffect(() => {
        if (userData && allPosts.length > 0) {
            // Filter posts to only show the ones created by the current user
            const filteredPosts = allPosts.filter(post => post.userId === userData.$id);
            setUserPosts(filteredPosts);
        }
    }, [allPosts, userData]);

    if (userPosts.length === 0) {
        return (
            <div className="w-full py-8 mt-4 text-center">
                <Container>
                    <h1 className="text-2xl font-bold">You haven't created any posts yet.</h1>
                </Container>
            </div>
        )
    }

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
    
  return (
    <div className='w-full py-8'>
        <Container>
            <div className='flex flex-wrap'>
                {userPosts.map((post) =>(
                    <div key={post.$id} className='p-2 w-1/4'>
                        <PostCard {...post} /> 
                    </div>
                ))}
            </div>
        </Container>
    </div>
  )
}

export default MyPosts