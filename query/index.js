const express = require("express");
const cors = require("cors");
const axios = require("axios");

const app = express();
app.use(express.json());
app.use(cors());

const posts = {};

const handleEvent = (type, data) => {
  console.log(posts);
  if (type === "PostCreated") {
    const {id, title} = data;
    posts[id] = {id, title, comments: []};
  }

  if (type === "CommentCreated") {
    const {id, content, postId, status} = data;
    const post = posts[postId];
    console.log("Post\n", post);
    console.log("PostID", postId);
    post.comments.push({id, content, status});
    console.log("------Current commented POST-----------\n", posts[postId]);
  }

  if (type === "CommentUpdated") {
    const {id, content, postId, status} = data;
    const post = posts[postId];
    const comment = post.comments.find((comment) => comment.id === id);
    comment.status = status;
    comment.content = content;
  }
};

app.get("/posts", (req, res) => {
  res.send(posts);
});

app.post("/events", (req, res) => {
  console.log("Recieved the event");
  const {type, data} = req.body;
  handleEvent(type, data);
  res.send({});
});

app.listen(4002, async () => {
  console.log("Listening on 4002");

  const res = await axios.get("http://event-bus-srv:4005/events");

  for (let event of res.data) {
    console.log("Processing event: ", event.type);
    handleEvent(event.type, event.data);
  }
});
