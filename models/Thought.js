const { Schema, model } = require('mongoose');
const reactionSchema = require('./Reaction');
const formatDate = require('../utils/formatDate.js');

// Schema to create a course model
const thoughtSchema = new Schema(
	{
		thoughtText: {
			type: String,
			required: true,
			minlength: 1,
			maxlength: 280,
		},
		createdAt: {
			type: Date,
			default: Date.now,
			get: (timestamp) => formatDate(timestamp),
		},
		username: {
			type: String,
			required: true,
		},
		reactions: [reactionSchema],
		userId: {
			type: Schema.Types.ObjectId,
			ref: 'User',
		}
	},
	{
		toJSON: {
			virtuals: true,
			getters: true,
		},
	},
);

const Thought = model('Thought', thoughtSchema);

module.exports = Thought;
