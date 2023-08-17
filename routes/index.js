const router = require('express').Router();
const apiRoutes = require('./api');

router.use('/api', apiRoutes);

router.use((req, res) => res.send(`Wrong route! Try one of these:
- /api/thoughts
- /api/thoughts/:thoughtId
- /api/thoughts/:thoughtId/reactions
- /api/thoughts/:thoughtId/reactions/:reactionId
- /api/users
- /api/users/:userId
- /api/users/:userId/friends/:friendId`));

module.exports = router;