/* GET home page. */
exports.getIndex = function (req, res, next) {
    res.render('index', {
        title: 'Express'
    });
};

exports.getAbout = function (req, res, next) {
    var d = new Date();
    var viewData = {
        year: d.getFullYear(),
        testVariable: 'User Agent: ' + req.headers['user-agent'],
        title: 'About us page'
    };
    res.render('about', viewData);
};