const { Router } = require('express');

/* Controllers */
const IndexCtrl = require('../controllers/index.ctrl');
const PollCtrl = require('../controllers/poll.ctrl');


const router = new Router();

/* Main Routes */
router.get('/', IndexCtrl.view);

router.get('/my-poll', PollCtrl.viewMyPoll);
router.post('/my-poll', PollCtrl.createMyPoll);
router.delete('/my-poll', PollCtrl.deleteMyPoll);


router.get('/polls/:id', PollCtrl.view);
router.post('/polls/:id/vote', PollCtrl.vote)

module.exports = router;