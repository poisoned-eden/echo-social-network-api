const { Thought, User } = require('../models');

module.exports = {
	// Get all thoughts
	async getThoughts(req, res) {
		try {
			const thoughts = await Thought.find();
			res.json(thoughts);
		} catch (err) {
			res.status(500).json(err);
		}
	},

	// Get a single thought
	async getSingleThought(req, res) {
		try {
			const thought = await Thought.findOne({
				_id: req.params.thoughtId,
			}).select('-__v');

			if (!thought) {
				return res
					.status(404)
					.json({ message: 'No thought with that ID' });
			}

			res.json(thought);
		} catch (err) {
			res.status(500).json(err);
		}
	},
	
	// Create a thought
	async createThought(req, res) {
		try {
			console.log('You are adding a thought');
			console.log(req.body);
			
			const thought = await Thought.create(req.body);

			console.log('Thought added');
			console.log(thought);

			const user = await User.findOneAndUpdate(
				{ _id: req.body.userId },
				{ $addToSet: { thoughts: thought._id } },
				{ runValidators: true, new: true },
			);
			
			if (!user) {
				console.log('Failed to update user with thought')
			} else {
				console.log('Succesffuly updated user with thought');
			}


			res.json(thought);
		} catch (err) {
			console.log(err);
			return res.status(500).json(err);
		}
	},
	
	// Delete a thought
	async deleteThought (req, res) {
		try {
			const thought = await Thought.findOneAndDelete({
				_id: req.params.thoughtId,
			});

			if (!thought) {
				res.status(404).json({ message: 'No thought with that ID' });
			}
		} catch (err) {
			res.status(500).json(err);
		}
	},
	
	// Update a thought
	async updateThought(req, res) {
		try {
			const thought = await Thought.findOneAndUpdate(
				{ _id: req.params.thoughtId },
				{ $set: req.body },
				{ runValidators: true, new: true },
			);

			if (!thought) {
				res.status(404).json({ message: 'No thought with this id!' });
			}

			res.json(thought);
		} catch (err) {
			res.status(500).json(err);
		}
	},

	async createReaction(req, res) {
		try {
			console.log('You are adding a reaction');
			console.log(req.body);
			
			const reaction = await Thought.findOneAndUpdate(
				{ _id: req.params.thoughtId },
				{ $addToSet: { reactions: req.body } },
				{ runValidators: true, new: true },
			);

			if (!reaction) {
				console.log('Failed to create reaction')
			} else {
				console.log('Reaction added');
				console.log(reaction);
			}


			res.json(reaction);
		} catch (err) {
			console.log(err);
			return res.status(500).json(err);
		}
	},

	async deleteReaction(req, res) {
		try {
			const reaction = await Thought.findOneAndUpdate(
				{ _id: req.params.thoughtId },
				{
					$pull: {
						reactions: { reactionId: req.params.reactionId },
					},
				},
				{ runValidators: true, new: true },
			);

			if (!reaction) {
				return res
					.status(404)
					.json({ message: 'No reaction found with that ID :(' });
			}

			res.json(reaction);
		} catch (err) {
			res.status(500).json(err);
		}
	}
};
