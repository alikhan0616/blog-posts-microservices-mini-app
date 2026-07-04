import axios from "axios";
import { useState } from "react"
import server from "./server";

export default function CommentCreate ({postId}) {
    const [content, setContent] = useState('');

    const onSubmit = async (e) => {
        e.preventDefault();

        await axios.post(`http://${server}/posts/${postId}/comments`, {
            content
        })

        setContent('')
    }

    return (
        <div className="">
            <form onSubmit={onSubmit}>
                <div className="form-group">
                    <label >New Comment</label>
                    <input value={content} onChange={e => setContent(e.target.value)} type="text" className="form-control" id="content" />
                </div>
                <button className="btn btn-primary">Submit</button>
            </form>
        </div>
    )
}

