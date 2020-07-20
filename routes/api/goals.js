const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const Goal = require('../../models/Goals');

// get api/goals
// get all goals
// private
router.get('/', auth, async (req, res) => {
  try {
    const goals = await Goal.find({ user: req.user.id });
    res.json(goals);
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server Error');
  }
});

// POST api/goals
// Add new data
// Private
router.post('/', auth, async (req, res) => {
  const { name, target } = req.body;
  try {
    if (name) {
      name;
    }
    if (target) {
      target;
    }
    const newGoal = new Goal({ name, target, user: req.user.id });
    const goal = await newGoal.save();
    return res.json(goal);
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server Error');
  }
});

// PUT api/goals/:id
// update the goal
// Private
router.put('/:id', auth, async (req, res) => {
  const { name, target } = req.body;
  const goalFields = {};
  if (name) goalFields.name = name;
  if (target) goalFields.target = target;
  try {
    let goal = await Goal.findById(req.params.id);
    if (!goal) {
      return res.status(404).json({ msg: 'Goal not found' });
    }
    //make sure user own the contact
    if (goal.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: 'Not authorized' });
    }
    goal = await Goal.findByIdAndUpdate(
      req.params.id,
      { $set: goalFields },
      { new: true }
    );
    res.json(goal);
  } catch (error) {
    console.error(err.message);
    res.satatus(500).send('server error');
  }
});

// Delete api/goals/:id
// delete the goal
// private
router.delete('/:id', auth, async (req, res) => {
  try {
    let goal = await Goal.findById(req.params.id);
    if (!goal) {
      return res.status(404).json({ msg: 'Goal not found' });
    }
    if (goal.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: 'Not authorized' });
    }
    await Goal.findByIdAndRemove(req.params.id);
    res.json({ msg: 'Your target is removed' });
  } catch (error) {
    console.error(err.message);
    res.satatus(500).send('server error');
  }
});

module.exports = router;
