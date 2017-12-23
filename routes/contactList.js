var express = require('express');
var router = express.Router();
var mongojs=require('mongojs');
var db=mongojs('first',['contactList']);
/* GET  contactList. */
router.get('/getContacts', function(req, res, next) {
    db.contactList.find().toArray(function (err,docs) {
        if(err) throw err;
        console.log(docs);
    });
});

module.exports = router;
