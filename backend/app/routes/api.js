const { Router } = require('express');

/* Controllers */
const IndexCtrl = require('../controllers/index.ctrl');
const PollCtrl = require('../controllers/poll.ctrl');


const router = new Router();

/* Main Routes */
router.get('/', IndexCtrl.view);

router.get('/my-poll', PollCtrl.viewMyPoll);
router.post('/my-poll', PollCtrl.createMyPoll);

module.exports = router;