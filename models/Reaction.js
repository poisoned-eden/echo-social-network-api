const { Schema, Types } = require('mongoose');
const formatDate = require('../utils/formatDate.js');

const reactionSchema = new Schema(
	{
		reactionId: {
			type: Schema.Types.ObjectId,
			default: () => new Types.ObjectId(),
		},
		reactionBody: {
			type: String,
			required: true,
			maxlength: 280,
			minlength: 1,
		},
		username: {
			type: String,
			required: true,
		},
		createdAt: {
			type: Date,
			default: Date.now,
			get: (timestamp) => formatDate(timestamp),
		},
	},
	{
		toJSON: {
			getters: true,
		},
		_id: false,
	},
);

module.exports = reactionSchema;
