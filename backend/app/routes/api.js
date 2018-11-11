const { Router } = require('express');

/* Controllers */
const IndexCtrl = require('../controllers/index.ctrl');


const router = new Router();

/* Main Routes */
router.get('/', IndexCtrl.view);

module.exports = router;