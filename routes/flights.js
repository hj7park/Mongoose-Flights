var express = require('express');
var router = express.Router();
const flightCtrl = require("../controllers/flightCtrl");
const ticketCtrl = require("../controllers/ticketCtrl");

/* GET home page. */
router.get('/', flightCtrl.index);
router.get('/new', flightCtrl.form);
router.post('/new', flightCtrl.create);

router.get('/:id',flightCtrl.show);
router.get('/:id/tickets/new', ticketCtrl.form);
router.post('/:id/tickets/new', ticketCtrl.create);
router.post('/:id/tickets/:did',ticketCtrl.deleteTicket);


router.post('/:id',flightCtrl.addDestination);
router.post('/:id/:did',flightCtrl.deleteDestination);

module.exports = router;
