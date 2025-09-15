import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux'; // 1. Import useSelector
import { Container, PostCard } from '../components';
import appwriteService from '../appwrite/config';

function Home() {
    const [posts, setPosts] = useState([]); // Start with empty array for simplicity
    const [loading, setLoading] = useState(true); // Add a dedicated loading state
    const authStatus = useSelector((state) => state.auth.status); // 2. Get auth status

    useEffect(() => {
        setLoading(true);
        appwriteService.getPosts().then((response) => {
            if (response && response.rows) {
                setPosts(response.rows);
                
            }
        }).finally(() => setLoading(false));
    }, []); // Rerun this effect if authStatus changes

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

    // Case 2: Logged in, but data is loading
    if (loading) {
        return (
            <div className="w-full py-8 mt-4 text-center">
                <Container>
                    <h1 className="text-2xl font-bold">Loading...</h1>
                </Container>
            </div>
        );
    }

    // Case 3: Logged in, loading finished, and there are no posts
    if (posts.length === 0) {
        return (
            <div className="w-full py-8 mt-4 text-center">
                <Container>
                    <h1 className="text-2xl font-bold hover:text-gray-500">
                        No posts found. Be the first to create one!
                    </h1>
                </Container>
            </div>
        );
    }

    // Case 4: Logged in, loading finished, and posts exist
    return (
        <div className='w-full py-8'>
            <Container>
                <div className='flex flex-wrap'>
                    {posts.map((post) => (
                        <div key={post.$id} className='p-2 w-1/4'>
                            <PostCard {...post} />
                        </div>
                    ))}
                </div>
            </Container>
        </div>
    );
}

export default Home;