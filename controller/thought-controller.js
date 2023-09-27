const { Thought, User, Reaction } = require('../models');
const {Types} = require('mongoose');

const ThoughtController = {
  async getAllThoughts(req, res) {
    try {
      const Thoughts = await Thought.find({});
      res.json(Thoughts);
    } catch (err) {
      res.status(500).json(err);
    }
  },

  async getThoughtsById(req, res) {
    try {
      const Thought = await Thought.findOne({_id:req.params.ThoughtId});
      if (!Thought) {
        res.status(404).json({ message: 'Thought not found' });
      } else {
        res.json(Thought);
      }
    } catch (err) {
      res.status(500).json(err);
    }
  },
  async createThought(req, res) {
    try {
      const Thought = await Thought.create(req.body);
      res.status(201).json(Thought);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  
  async deleteThought(req,res) {
    try {
        const Thought = await Thought.findByIdAndDelete({_id:req.params.ThoughtId});
        res.status(200).json(Thought);
    } catch (err) {
        res.status(500).json(err);
    }
  },

  async updateThoughtById(req, res) {
    try {
      const Thought = await Thought.findByIdAndUpdate(req.params.ThoughtId, req.body, {
        new: true,
      });
      if (!Thought) {
        res.status(404).json({ message: 'Thought not found' });
      } else {
        res.json(Thought);
      }
    } catch (err) {
      res.status(500).json(err);
    }
  },

  async createReaction(req, res) {
      try {
        const Thought = await Thought.findOneAndUpdate(
            {_id:req.params.ThoughtId},
            {$addToSet: {reactions: req.body}},
            {runValidators: true, new: true}
        );
        Thought ? res.json(Thought) : res.status(404).json({message: notFound});
    } catch (e) {
        res.status(500).json(e);
    }
  },

  async deleteReaction(req, res) {
      try {
        const Thought = await Thought.findOneAndUpdate(
            {_id: req.params.ThoughtId},
            {$pull: {reactions: {reactionId: req.params.reactionId}}},
            {runValidators: true, new: true}
        );

        Thought ? res.json(Thought) : res.status(404).json({message: notFound});
    } catch (e) {
        res.status(500).json(e);
    }
  },

};

module.exports = ThoughtController