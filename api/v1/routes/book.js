var express = require('express');
var router = express.Router();
var tools = require('./../../../modules/tools');
var dbLayer = require('../../../modules/dbLayer');

router.get('/', function(req, res, next) {
    var Book = dbLayer.book;
    Book.findAll().then(function(books) {
        var viewData = {
            title: 'List all books',
            books: books,
        }
        // res.render('adminMain', viewData);
        return res.status(200).json({
                success:  true,
                satus: 200,
                "resource": "book",
                data: viewData 
        });
    });
});
module.exports = router;
