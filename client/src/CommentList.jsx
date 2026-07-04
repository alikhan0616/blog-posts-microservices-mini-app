


function CommentList({comments}) {

const renderedComments = comments.map(comment => {
    let content;

    if(comment.status === 'pending') {
        content = 'This comment is awaiting moderation'
    } else if (comment.status === 'rejected') {
        content = 'This comment has been rejected'
    } else {
        content = comment.content
    }
    return <li key={comment.id}>{content}</li>
});


    return ( 
        <ul>
            {renderedComments}
        </ul>
     );
}

export default CommentList;