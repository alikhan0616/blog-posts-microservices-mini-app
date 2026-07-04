import PostCrate from './PostCreate'
import PostList from './PostList'

function App () {
  return (
    <div className='container'>
    <h1>Create Post!!!!</h1>
    <PostCrate />
    <hr />
    <h1>Posts</h1>
    <PostList />
    </div>
  )
}

export default App