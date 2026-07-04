
import {useState} from 'react'
import axios from 'axios'
import server from './server'



function PostCreate () {

    const onSubmit =  async (e) => {
        e.preventDefault()
        
        await axios.post(`http://${server}/posts/create`, {
            title
        })

        setTitle("")
    }

    const [title, setTitle] = useState('')
    return (
        <div>
            <form onSubmit={onSubmit}>
                <div className='form-group'>
                    <label>Title</label>
                    <input 
                        type='text' 
                        className='form-control' 
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                    />
                </div>
                <button className='btn btn-primary'>Submit</button>
            </form>
        </div>
    )
}

export default PostCreate