
import {useState, useEffect} from 'react'
import axios from 'axios'
import CommentCreate from './CommentCreate'
import CommentList from './CommentList'
import server from './server'

export default function PostList () {
    const [posts, setPosts] = useState({})

    const fetchPosts = async () => {
        const res = await axios.get(`http://${server}/posts`)
        setPosts(res.data)
    }

    useEffect(() => {
        fetchPosts()
    }, [])

    const renderedPosts = Object.values(posts).map(post => {
         return (
            <div key={post.id} className='card' style={{width: '30%' , marginBottom: '20px'}}>
             <div className='card-body'
             >
                <h3 className='card-title'>{post.title}</h3>
                <CommentList comments={post.comments}/>
                <CommentCreate postId={post.id}/>
                </div>
                </div>
                )
            
    })
    return (
        <div className='d-flex flex-row flex-wrap justify-content-between'>
            {renderedPosts}
        </div>
    )
}