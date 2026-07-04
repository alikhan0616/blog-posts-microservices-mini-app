const express = require('express')
const {randomBytes} = require('crypto')
const bodyParser = require('body-parser')
const cors = require('cors')
const axios = require('axios')
const app = express()
app.use(bodyParser.json());
app.use(cors());

const commentsByPostId = {};

app.get('/posts/:id/comments', (req, res) => {
    res.send(commentsByPostId[req.params.id] || [])
})

app.post('/posts/:id/comments', async (req, res) => {
    const commentId = randomBytes(4).toString('hex')
    const {content} = req.body

    const comments = commentsByPostId[req.params.id] || []

    comments.push({id: commentId, content, status: "pending"});

    commentsByPostId[req.params.id] = comments

    await axios.post('http://event-bus-srv:4005/events', {
        type: 'CommentCreated',
        data: {
            id: commentId,
            content,
            postId: req.params.id,
            status: "pending"
        }
    }).catch((err) => {
        console.log('Error posting comment event to event bus', err.message)
    }   )

    res.status(201).send(comments)
})

app.post('/events', async (req, res) => {
    console.log('Received event', req.body.type)

    const {type, data} = req.body;

    if (type === 'CommentModerated') {
        const {postId, id, status, content} = data;
        const comments = commentsByPostId[postId];
        const comment = comments.find(comment => {
            return comment.id === id;
        })
        
        comment.status = status;

        await axios.post('http://event-bus-srv:4005/events', {
            type: 'CommentUpdated',
            data: {
                id,
                status,
                postId,
                content
            }
        })
    }
    res.send({})
})

app.listen(4001, () => {
    console.log('Server is running on port 4001')
})