const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const Post = require('../../models/Posts');
// const User = require('../../models/User');

// GET api/posts
// get all users posts
// Private
router.get('/', auth, async (req, res) => {
  try {
    const posts = await Post.find({ user: req.user.id }).sort({ date: -1 });
    res.json(posts);
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server Error');
  }
});

// POST api/tests
// Add new data
// Private
router.post('/', auth, async (req, res) => {
  const { name, duration, distance, reps, mydate } = req.body;
  try {
    if (duration) {
      duration;
    }
    if (distance) {
      distance;
    }
    if (reps) {
      reps;
    }
    if (mydate) {
      mydate;
    }
    const newPost = new Post({
      name,
      duration,
      distance,
      reps,
      mydate,
      user: req.user.id,
    });

    const post = await newPost.save();
    return res.json(post);
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server Error');
  }
});

// PUT api/posts/:id
// update the post
// Private
router.put('/:id', auth, async (req, res) => {
  const { name, duration, distance, reps, mydate } = req.body;

  const postFields = {};
  if (name) postFields.name = name;
  if (duration) postFields.duration = duration;
  if (distance) postFields.distance = distance;
  if (reps) postFields.reps = reps;
  if (mydate) postFields.mydate = mydate;

  try {
    let post = await Post.findById(req.params.id);
    if (!post) return res.status(404).json({ msg: 'Contact not found' });
    // make sur user owns the posts
    if (post.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: 'Not authorized' });
    }
    post = await Post.findByIdAndUpdate(
      req.params.id,
      { $set: postFields },
      { new: true }
    );
    res.json(post);
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server Error');
  }
});

// DELETE api/posts/:id
// Delete the post
// Private
router.delete('/:id', auth, async (req, res) => {
  try {
    let post = await Post.findById(req.params.id);
    if (!post) return res.status(404).json({ msg: 'Contact not found' });
    // make sur user owns the posts
    if (post.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: 'Not authorized' });
    }

    await Post.findByIdAndRemove(req.params.id);

    res.json({ msg: 'Post deleted' });
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router;
