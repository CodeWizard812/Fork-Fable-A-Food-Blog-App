import React, { useState, useEffect } from 'react'
import { Container, PostCard} from '../components'
import appwriteService from '../appwrite/config'

function AllPosts() {
    const [posts, setPosts] = useState([])

    useEffect(() => {
        appwriteService.getPosts([]).then((response) => {
            if (response && response.rows) {
                setPosts(response.rows)
            }
        });
    }, [])

    if(posts.length === 0){
        return(
            <div className='w-full py-8'>
                <Container>
                    <h2>No posts found.</h2>
                </Container>
            </div>
        )
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