const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const Comments = require('../../models/Comments');
const User = require('../../models/User');
const { check, validationResult } = require('express-validator');

// post api/comments
// create a comment
// private
router.post(
  '/',
  [auth, [check('text', 'Text is required').not().isEmpty()]],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const user = await User.findById(req.user.id).select('-password');
      const newComment = new Comments({
        text: req.body.text,
        name: user.name,
        avatar: user.avatar,
        user: req.user.id,
      });

      const comment = await newComment.save();
      res.json(comment);
    } catch (error) {
      console.log(error.message);
      res.status(500).send('Server Error');
    }
  }
);

// get api/comments
// get all comments
// private
router.get('/', auth, async (req, res) => {
  try {
    const comments = await Comments.find().sort({ date: -1 });
    res.json(comments);
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server Error');
  }
});

// delete api/comments/:id
// delete a comment
// private
router.delete('/:id', auth, async (req, res) => {
  try {
    const comment = await Comments.findById(req.params.id);

    //check comment is exist
    if (!comment) {
      return res.status(404).json({ msg: 'Comment not found' });
    }
    // check user
    if (comment.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: 'User not authorized' });
    }
    await comment.remove();
    res.json({ msg: 'Comment removed' });
  } catch (err) {
    console.error(err.message);
    console.log(err);
    if (err.kind === undefined) {
      return res.status(404).json({ msg: 'Comment not found' });
    }
    res.status(500).send('Server Error');
  }
});

module.exports = router;
