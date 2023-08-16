const { ObjectId } = require('mongoose').Types;
const { User, Thought } = require('../models');

module.exports = {
	// Get all users
	async getUsers(req, res) {
		try {
			const users = await User.find();
			res.json(users);
		} catch (err) {
			console.log(err);
			return res.status(500).json(err);
		}
	},

	// TODO: set this to pull in full thoughts and friends info
	// Get a single user
	async getSingleUser(req, res) {
		try {
			const user = await User
				.findOne({
					_id: req.params.userId,
				})
				.populate('thoughts')
				.populate('friends')
				.select('-__v');

			if (!user) {
				return res
					.status(404)
					.json({ message: 'No user with that ID' });
			}

			res.json(user);
		} catch (err) {
			console.log(err);
			return res.status(500).json(err);
		}
	},
	// create a new user
	async createUser(req, res) {
		try {
			const user = await User.create(req.body);
			res.json(user);
		} catch (err) {
			res.status(500).json(err);
		}
	},
	// Delete a user and remove them from the course
	async deleteUser(req, res) {
		try {
			const user = await User.findOneAndRemove({
				_id: req.params.userId,
			});

			if (!user) {
				return res
				.status(404)
				.json({ message: 'No such user exists' });
			}
			
			console.log('deleted user');
			console.log(user);

			const thoughts = await Thought.deleteMany(
				{ username: user.username }
			);
			
			
			res.json({ 
				userDeleted: user,
				thoughtsDeleted: thoughts
			});

		} catch (err) {
			console.log(err);
			res.status(500).json(err);
		}
	},

	async updateUser(req, res) {
		try {
			const user = await User.findOneAndUpdate(
				{ _id: req.params.userId },
				{ $set: req.body },
				{ runValidators: true, new: true },
			);

			if (!user) {
				res.status(404).json({ message: 'No user with this username!' });
			}

			res.json(user);
		} catch (err) {
			console.log(err);
			res.status(500).json(err);
		}
	},

	// Add a friend to a user
	async addFriend(req, res) {
		console.log('You are adding an friend');
		console.log(req.body);

		try {
			const user = await User.findOneAndUpdate(
				{ _id: req.params.userId },
				{ $addToSet: { friends: req.params.friendId } },
				{ runValidators: true, new: true },
			);

			if (!user) {
				return res
					.status(404)
					.json({ message: 'No user found with that ID :(' });
			}

			res.json(user);
		} catch (err) {
			res.status(500).json(err);
		}
	},
	// Remove friend from a user
	async removeFriend(req, res) {
		try {
			const user = await User.findOneAndUpdate(
				{ _id: req.params.userId },
				{
					$pull: {
						friends: { friendId: req.params.friendId },
					},
				},
				{ runValidators: true, new: true },
			);

			if (!user) {
				return res
					.status(404)
					.json({ message: 'No user found with that ID :(' });
			}

			res.json(user);
		} catch (err) {
			res.status(500).json(err);
		}
	},
};
